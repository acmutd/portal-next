---
sidebar_position: 4
---

# Birthday Script

The birthday bot program resides in the repository as a GitHub action triggered workflow. Much like the anniversary program, this script runs eveery night to check whether there are any birthdays on that date. Birthdays for officers are found on this [google spreadsheet](https://docs.google.com/spreadsheets/d/1hGO85H85VOhVnI-seXKsDKIXVKZ8Kq1EK59hF382u6k/edit#gid=0). Note: Need to be signed in with an `@acmutd.co` account to view the spreadsheet. If you've just joined the organization update the spreadsheet with your birthday too! 

### Setup

To run the birthday script locally follow these steps:

 - Clone the repo `git clone https://github.com/acmutd/leadership.git`
 - Open the `calendar-converter` project in google cloud, find the default service account and download the `.json` key.

:::caution
You may need to create a new key for the service account to be able to download it. If the service account has reached the limit for the number of keys then reach out to an existing contributor for the key or duplicate the service account.
:::

 - Set the following environment variables via the command line

```
export SLACK_CHANNEL_ID=<WEBHOOK_URL>
export SLACK_TOKEN=<API_KEY>
export BIRTHDAY_SPREADSHEET_ID=https://docs.google.com/spreadsheets/<SPREADSHEET_ID>/edit
export GOOGLE_APPLICATION_CREDENTIALS=<PATH_TO_SERVICE_ACCOUNT_JSON_FILE>
```

:::tip
While iterating over local code changes it can be helpful to add a dummy birthday to the google spreadsheet with the current date. Additionally, it would be helpful to set the `SLACK_CHANNEL_ID` to be a Direct Message with yourself in the slack workspace. This will help prevent clutter in public slack channels.
:::

### Launch

 - Run `npm install`
 - Run `npm run birthday-build`
 - Run `npm run birthday-start`