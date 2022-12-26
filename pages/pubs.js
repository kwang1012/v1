import Head from 'next/head';
import PublicationView from 'src/simpleViews/pubs';

export default function Publication({ pubs }) {
  return (
    <>
      <Head>
        <title>Kai Wang - Publications</title>
      </Head>
      <PublicationView pubs={pubs} />
    </>
  );
}

import { getPubs } from './api/pubs';

// This function gets called at build time
export async function getServerSideProps() {
  const pubs = await getPubs();
  return {
    props: {
      pubs,
    },
  };
}
