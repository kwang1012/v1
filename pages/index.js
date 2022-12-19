import Head from 'next/head';
import HomeView from '../src/views/home';

export default function Home({ pubs }) {
  return (
    <>
      <Head>
        <title>Kai Wang</title>
      </Head>
      <HomeView pubs={pubs}></HomeView>
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
