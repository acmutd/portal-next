import { google } from "googleapis";

const spreadsheetId = process.env.GOOGLE_SHEET_SHEET_ID;

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEET_CLIENT_EMAIL as string,
        private_key: (process.env.GOOGLE_SHEET_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function readData(range: string): Promise<string[][]> {
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        
        return response.data.values ?? [];

    } catch (e) {
        console.log(e)
        throw e
        
    }

    
  }

