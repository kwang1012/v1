import { google } from 'googleapis';

const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64').toString());

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({
  version: 'v3',
  auth,
});

const calendarId = ['bruce1198@gmail.com', 'kswang@lsalab.cs.nthu.edu.tw', 'bruce@skymizer.com'];

async function getEventsByCalendarId(year, month, cid) {
  const startYear = month === 1 ? year - 1 : year;
  let startMonth = (((month - 1) % 12) + 12) % 12;
  if (startMonth === 0) startMonth = 12;
  const endYear = month === 12 ? year + 1 : year;
  let endMonth = (((month + 1) % 12) + 12) % 12;
  if (endMonth === 0) endMonth = 12;
  let pageToken;
  let returnItems = [];
  do {
    const {
      data: { items, nextPageToken },
    } = await calendar.events.list({
      calendarId: cid,
      pageToken,
      singleEvents: true,
      timeMin: `${startYear}-${startMonth}-01T00:00:00-08:00`,
      timeMax: `${endYear}-${endMonth}-28T00:00:00-08:00`,
      orderBy: 'startTime',
    });
    returnItems = returnItems.concat(items);
    pageToken = nextPageToken;
  } while (pageToken);
  return returnItems;
}

export async function getEvents(year, month) {
  if (typeof calendarId === 'string') return getEventsByCalendarId(year, month, calendarId);

  let returnItems = [];
  for (const cid of calendarId) {
    try {
      const items = await getEventsByCalendarId(year, month, cid);
      returnItems = returnItems.concat(items);
    } catch (e) {
      console.log(e.message);
    }
  }
  return returnItems;
}

async function handler(req, res) {
  let { year, month } = req.query;
  if (year && month) {
    year = parseInt(year);
    month = parseInt(month);

    getEvents(year, month)
      .then((events) => res.status(200).send(events))
      .catch(() => res.status(400).send('Internal Server Error'));
  } else {
    res.status(400).send('Bad Request');
  }
}
export default handler;
