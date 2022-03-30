import { PubSub } from '@google-cloud/pubsub';

export const pubsubClientConfig = {
  projectId: 'acm-core',
  credentials: {
    client_email: process.env.GOOGLE_APPLICATION_CLIENT_EMAIL!,
    private_key: process.env.GOOGLE_APPLICATION_PRIVATE_KEY!,
  },
};

const pubsubclient = new PubSub(pubsubClientConfig);

export const topicName = 'projects/acm-core/topics/TEST_PUBSUB';
export const subscriberName = 'projects/acm-core/subscriptions/TEST_SUBSCRIBER';
export default pubsubclient;
