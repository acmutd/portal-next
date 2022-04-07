---
sidebar_position: 3
---

# Anniversary Script

The repository also separately from the NextJS application houses the Anniversary workflow. This script runs as a GitHub action every night to check whether an anniversary has occured and if so to then send a message in slack.

### Setup

To run the anniversary script locally follow these steps:

 - Clone the repo `git clone https://github.com/acmutd/leadership.git`
 - Set all the environment variables for the firebase config via the command line. The script does not use `dotenv` so set them as global environment variables using `export FIREBASE_API_KEY=<API KEY>` etc. 
 - Set the slack channel environment variable to point to the `#general` channel by running `export SLACK_CHANNEL_ID=<WEBHOOK URL>`. Note that this is different from the slack channel ID used by the NextJS application (which points to `#shoutouts`).

Note: You can find all the environment variables by asking a contributor or by checking [Doppler](https://doppler.com).

:::tip
When iterating over different code changes it might be helpful to set the `SLACK_CHANNEL_ID` to be a Direct Message with yourself in the slack workspace. This will help prevent clutter in public slack channels.
:::

### Launch

 - Run `npm install`
 - Run `npm run anniversary-build`
 - Run `npm run anniversary-start`