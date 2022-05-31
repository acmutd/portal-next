---
sidebar_position: 0
---

# Slack
The [Slack API](https://api.slack.com/docs) service provides numerous utilities to interact with the ACM Slack workspace via trigger functions and API calls. The API's messaging functionality will be utilized to send updates, automate certain actions and notifications, and maintain the `#shoutouts` channel.

The primary method of communication will be *Incoming Webhooks*, which are one-way webhooks that allow a given payload to be posted to a specific Slack channel by means of an unique URL.
## Incoming Webhooks
[Incoming Webhooks](https://api.slack.com/messaging/webhooks) are a feature of the Slack API that allow a payload to be posted to a specific Slack channel by means of a unique URL.

### Sending Messages to a specific channel
[Incoming Webhooks can be generated programmatically](https://api.slack.com/messaging/webhooks#incoming_webhooks_programmatic) to post a request to a specific channel, and are classified by the `channel` and `channel_id parameters.

