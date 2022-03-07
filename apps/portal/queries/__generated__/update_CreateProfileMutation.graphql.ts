/**
 * @generated SignedSource<<c79f252cd34c4b57e6dcd292382b1aa6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PartialProfile = {
  classStanding: string;
  email: string;
  firstName: string;
  graduation: GraduationInputType;
  lastName: string;
  major: string;
  netid: string;
  user: any;
  utdStudent: boolean;
};
export type GraduationInputType = {
  semester: string;
  year: string;
};
export type update_CreateProfileMutation$variables = {
  profile: PartialProfile;
};
export type update_CreateProfileMutation$data = {
  readonly createProfile: {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly graduation: {
      readonly semester: string;
      readonly year: string;
    };
    readonly classStanding: string;
    readonly _id: any;
    readonly major: string;
    readonly membershipStatus: boolean;
  };
};
export type update_CreateProfileMutation = {
  variables: update_CreateProfileMutation$variables;
  response: update_CreateProfileMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "profile"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "profile",
        "variableName": "profile"
      }
    ],
    "concreteType": "Profile",
    "kind": "LinkedField",
    "name": "createProfile",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Graduation",
        "kind": "LinkedField",
        "name": "graduation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "semester",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "year",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "classStanding",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "_id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "major",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "membershipStatus",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "update_CreateProfileMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "update_CreateProfileMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6057b22418e9d928be1b34edcca7fd07",
    "id": null,
    "metadata": {},
    "name": "update_CreateProfileMutation",
    "operationKind": "mutation",
    "text": "mutation update_CreateProfileMutation(\n  $profile: PartialProfile!\n) {\n  createProfile(profile: $profile) {\n    email\n    firstName\n    lastName\n    graduation {\n      semester\n      year\n    }\n    classStanding\n    _id\n    major\n    membershipStatus\n  }\n}\n"
  }
};
})();

(node as any).hash = "d2fe8ac00a6cee86fdc1aa6a426d3bec";

export default node;
