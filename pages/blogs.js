import Head from 'next/head';
import { MiscellaneousView } from 'src/simpleViews/miscellaneous';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Kai Wang - Miscellaneous</title>
      </Head>
      <MiscellaneousView />
    </>
  );
}
