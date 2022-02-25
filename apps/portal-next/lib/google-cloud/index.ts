import { Storage } from '@google-cloud/storage';

const googleCloudStorage = new Storage({
  projectId: 'acm-core',
  credentials: {
    client_email: process.env.GOOGLE_APPLICATION_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_APPLICATION_PRIVATE_KEY,
  },
});

export default googleCloudStorage;
