import { google, sheets_v4 } from "googleapis";

const spreadsheetId = process.env.BUDGET_SHEET_ID;

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_SHEET_CLIENT_EMAIL as string,
        private_key: (process.env.GOOGLE_SHEET_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function readSpreadsheet(ranges: string[]): Promise<sheets_v4.Schema$ValueRange[] | undefined> {
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.values.batchGet({
            spreadsheetId,
            ranges,
            majorDimension: "ROWS"
            
        });
        
        return response.data.valueRanges
        
    } catch (e) {
        console.log(e)
        throw e
        
    }
  }

