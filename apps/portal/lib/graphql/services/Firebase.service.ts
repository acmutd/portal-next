import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('C:/UTD/Senior Year/Spring Semester 2022/Projects/try-acm/practice-5d375-firebase-adminsdk-tbfef-003353b527.json');
require('dotenv').config();

@singleton()
export default class Firebase {
  db: any;
  constructor() {
    initializeApp({
      credential: cert({
        type: process.env.FBASE_TYPE,
        project_id: process.env.FBASE_PROJECTID,
        private_key_id: process.env.FBASE_P_KEYID,
        private_key: process.env.FBASE_P_KEY,
        client_email: process.env.FBASE_CLIENT_EMAIL,
        client_id: process.env.FBASE_CLIENT_ID,
        auth_uri: process.env.FBASE_AUTHURI,
        token_uri: process.env.FBASE_TOKENURI,
        auth_provider_x509_cert_url: process.env.FBASE_AUTHCERT,
        client_x509_cert_url: process.env.FBASE_CLIENTCERT,
      }),
    });
    this.db = getFirestore();
  }

  async returnEventsbyProfile(netId: string, email: string): Promise<String[]> {
    var docRef = this.db.collection('profile_data');

    return docRef
      .where('net_id', '==', netId)
      .where('email', '==', email)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          return doc.data().past_events;
        });
      })
      .catch((error) => {
        console.log('Error getting profile and corresponding event data: ', error);
      });
  }
}
