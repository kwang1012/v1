import Head from 'next/head';
import SimpleLayout from 'src/layouts/simple-layout';
import MiscellaneousView from 'src/simpleViews/miscellaneous';

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

Miscellaneous.getLayout = function getLayout(page) {
  return <SimpleLayout>{page}</SimpleLayout>;
};
