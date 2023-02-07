import Head from 'next/head';
import { ScheduleView } from '@/views/schedule';

export default function Schedule() {
  return (
    <>
      <Head>
        <title>Kai Wang - Schedule</title>
      </Head>
      <ScheduleView />
    </>
  );
}
