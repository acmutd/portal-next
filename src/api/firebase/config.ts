import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_GCP_APIKEY,
  storageBucket: process.env.REACT_APP_GCP_BUCKET_URL,
});

export const firebaseStorage = getStorage(firebaseApp);