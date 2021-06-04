# Understanding Authorization Routes

Goals:
 - Ensure that only people the appropriate authentication credentials are able to access certain pages
 - Avoid duplicating code within each component to check whether a person is authenticated
 - Wrap the `Route` component from the `react-router-dom` library to ensure that developers have the some interface to interact

## Background | Recoil Data State

Before we go into what the Routes are looking to validate we first need to understand what data we are storing in our recoil global states.

Note: This was the previously used data architecture, at the end of this section I'll outline a slightly different mechanism to implement.

Currently, we store our auth status in 2 places in recoil. Check `/src/api/state.ts` to refer to the next few items. 

Firstly, we currently have an atom called `jwt`. This object has the following interface: `

```
interface {
    token: string;
    isSet: boolean;
}
```

The `jwt` atom currently is used to the Auth0 JWT and a variable that checks whether it is set or not. The reason we have this additional variable is to avoid re-setting the jwt if it is already set. You can find in various places across our code where we do `if(!auth_status.isSet)` to ensure that we only store the jwt if its not already set. Now if you're wondering why we don't just overwrite the jwt even its already set its to minimize the number of redundant API calls that are made. Everything in the `state.ts` file that is a selector (which is everything except for the jwt), will automatically re-evaluate if there's a change to its dependency --> jwt. Therefore, everytime that the jwt changes it causes everything else to also re-fetch data too. 

**Note**: We should **never directly use the `jwt` atom** anywhere in our code. There's no harm but its against development best practices to use data that has not been validated. Thats why whenever in our code when we are interacting with the `jwt` atom we only have write permissions but no read permissions. 

The second piece of authentication information we have is in the recoil selector `auth`. 

**Note**: This is a recoil selector meaning that we only have read permissions but no write permissions. The way this selector works is that it takes the JWT from the `jwt` atom, passes it to the backend which validates & decodes it, and then passes it back to the front-end for usage. 

The `auth` selector has the following interface:

```
interface auth_status {
  jwt: string;
  decoded_jwt?: decoded_jwt;
  idp?: string; // Auth0 or GSuite
  is_verified: boolean;
}
```

**Note**: We should not actually still use the information in the decoded_jwt for anything. We will rely on the `profile` selector for information about the individual that signed in. The `auth` selector exists to ensure that we get back the `is_verified` which validates whether the jwt was still valid and that there is an authenticated session.

In the past when the portal supported both sign in with Auth0 and Sign in with G Suite, we would store the JWT in the same `jwt` atom. This meant that when a person signed out of one and into the other it would overwrite the `jwt`. Thus since a single atom stored a jwt it was not possible for a person to be signed into Auth0 and G Suite at the same time. Signing into one would inadvertently sign them out of the other. The `idp` variable exists in the `auth` selector to let the portal be aware of which identity provider the person had authenticated against. This functionality is now deprecated. We no longer care about which idp since we know that it will always be the Auth0 jwt stored in the `jwt` atom.

**Best Solution**: Create another atom `jwt_gsuite` which stores the JWT for G Suite. This can have the exact same interface. Later on when we need to fetch additional officer specific data we can create selectors that rely upon this atom. This will also solve the problem and allow people to have concurrent sessions (being signed into Auth0 and G Suite at the same time). 

## Current Code Info

This section will cover what code is currently written, what's in use, and what's deprecated.

All the code that we will refer to is located in `/src/components/Actions`

#### `Authorize.tsx` | Deprecated

This component served as a loading page when needing to authenticate with G Suite. Basically if someone tried to access a page when they weren't signed in they would see this page and it would auto-refresh to trigger cloudflare access to try and sign the person in. Once the person signed in it would save their jwt to recoil and redirect to the root url.

#### `AuthRoute.tsx` | In Use

This component is now currently in use. Its basically 90% copied straight from the Auth0 documentation page. The only change we have is to store the jwt in recoil and update sentry to also include the profile of the person who has signed in. 

#### `Logout.tsx` | Deprecated

This would just fire off a couple API calls to sign out of both cloudflare access & auth0. Then it would redirect back to the root url. We may later need to copy the api call to sign out of cloudflare access but the sign out of auth0 functionality is now done with their library instead.

#### `LogoutAuth0.tsx` | Deprecated

Sign the person out & log a couple variables. Had a dummy typeform displayed to confirm sign out. This file can be deleted. No useful material.

#### `ProfileRoute` | Bug

This file is very similar to `AuthRoute.tsx` which is in use. The difference here is that in addition to checking whether the person is signed in we would also want to check for whether they have a profile filled out. Right now there's a bug and this component does not function as expected. Ideally we would fix this to avoid code duplication. The code to check for whether a person has a profile is duplicated in the `profile.tsx` and `form.tsx` files. 

#### `ProtectedRoute` | Deprecated

This is what we used to previously check whether someone was signed into G Suite. We want to mimic this logic. Basically all it does is check the `auth` selector from recoil to see whether `is_verified` is true or not. What we want to do is create a new `jwt_gsuite` atom in recoil a new `auth_gsuite` selector in recoil to see whether the person is verified that their cloudflare access jwt is valid. Then if its true we can allow them to access the page. 

## Final Notes

The code for allowing only people to access a page if they are signed into G Suite already exists but is scattered across many places. We need to put it back together (or rewrite it to do the job better). This information should prove to be useful in understanding how authentication happens on the portal. 

Note: Also refer to the backend functions that verify the jwt. You may need to modify them slightly as well.

