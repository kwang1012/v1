import Head from 'next/head';
import { ScheduleView } from 'src/views/schedule';

export default function Publication() {
  return (
    <>
      <Head>
        <title>Kai Wang - Schedule</title>
      </Head>
      <ScheduleView />
    </>
  );
}

// export async function getServerSideProps() {
//   const today = new Date();
//   const data = await getEvents(today.getFullYear(), today.getMonth() + 1);
//   const events = {};
//   for (const evt of data) {
//     const dateTime = new Date(evt.start.dateTime);
//     const year = dateTime.getFullYear();
//     const month = dateTime.getMonth() + 1;
//     const date = dateTime.getDate();
//     if (!events[year]) events[year] = {};
//     if (!events[year][month]) events[year][month] = {};
//     if (!events[year][month][date]) events[year][month][date] = [evt];
//     else {
//       const exist = events[year][month][date].find((event) => event.id === evt.id);
//       if (!exist) events[year][month][date].push(evt);
//     }
//   }
//   return {
//     props: {
//       events,
//     },
//   };
// }
