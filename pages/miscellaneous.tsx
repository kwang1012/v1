import Head from 'next/head';
import { ReactElement } from 'react';
import SimpleLayout from '@/layouts/simple-layout';
import MiscellaneousView from '@/simpleViews/miscellaneous';

export default function Miscellaneous() {
  return (
    <>
      <Head>
        <title>Kai Wang - Miscellaneous</title>
      </Head>
      <MiscellaneousView />
    </>
  );
}

Miscellaneous.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};
