import { Event } from 'lib/generated/graphql';
import { google } from 'googleapis';

const scopes = ['https://www.googleapis.com/auth/calendar'];

type GoogleTimestamp = {
  dateTime: string;
  timeZone: 'America/Chicago';
};

type GoogleEvent = {
  summary: string;
  location: string;
  description?: string;
  start: GoogleTimestamp;
  end: GoogleTimestamp;
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_APPLICATION_CLIENT_EMAIL as string,
    private_key: String.raw`${process.env.GOOGLE_APPLICATION_PRIVATE_KEY}`,
  },
  scopes,
});

export async function addEventToGCal(event: Event) {
  const start: GoogleTimestamp = {
    dateTime: event.start.toISOString(),
    timeZone: 'America/Chicago',
  };
  const end: GoogleTimestamp = {
    dateTime: event.end.toISOString(),
    timeZone: 'America/Chicago',
  };

  const googleEvent: GoogleEvent = {
    start,
    end,
    summary: event.summary,
    location: event.location,
    description: event.description,
  };

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    await calendar.events.insert({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: googleEvent,
    });
  } catch (e) {
    console.error(e);
  }
}
