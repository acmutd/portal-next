---
sidebar_position: 0
---

# Portal

To get started with running a version of the leadership site locally follow these steps:

### Setup

- Clone the repo `git clone https://github.com/acmutd/leadership.git`
- Fill in the values in `.env.local.example` and rename it to `.env.local`. Reach out to an existing contributor to get these values.

Note: You can also find the environment variables via [Doppler](https://doppler.com). Open the Doppler website, sign in with your ACM account and open the leadership project. Then copy the variables in the `dev` config to your local `.env.local` file. Currently, the leadership site uses Doppler to fetch environment variables for its production vercel deployment. It is not configured to pull the environment variables from Doppler for local workloads yet.

### Launch

- Run `npm install`
- Run `npm run dev`

:::caution
If you are using Windows, running `npm run dev` may cause some errors. By default this project is setup to inspect server side logs and print them to the terminal window running the application. If there are any issues remove the `NODE_OPTIONS='--inspect'` from the scripts section of the `package.json` file for `npm run dev`.
:::

After running these steps you should be able to open up `http://localhost:3000` and view the leadership site!
