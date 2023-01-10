import Head from 'next/head';
import { ReactElement } from 'react';
import SimpleLayout from '@/layouts/simple-layout';
import ExperienceView from '@/simpleViews/experience';

export default function Experience() {
  return (
    <>
      <Head>
        <title>Kai Wang - Experiences</title>
      </Head>
      <ExperienceView />
    </>
  );
}

Experience.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};
