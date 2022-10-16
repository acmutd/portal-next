import axios from 'axios';

export interface SendSlackMessageConfig {
  form_name: string;
  name: string;
  email: string;
  message?: string;
  url?: string;
}

export const sendSlackMessage = async (msg: SendSlackMessageConfig): Promise<boolean> => {
  const channelId = `${process.env.SLACK_WEBHOOK_PROJ_MEMBER_PORTAL!}`;
  try {
    const payload: { blocks: any[] } = {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Thanks for submitting the ${msg.form_name}! Your request has been processed & is now active.`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${msg.message || '*Details*'}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `User: ${msg.name}\nEmail: ${msg.email}`,
          },
        },
      ],
    };
    if (msg.url) {
      payload.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Resource URL: ${msg.url}`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Visit Page',
            emoji: true,
          },
          value: 'linked_url',
          url: msg.url,
          action_id: 'button-action',
        },
      });
    }
    await axios.post(channelId, payload);
    return true;
  } catch (error: any) {
    console.error(JSON.stringify(error));
    return false;
  }
};
