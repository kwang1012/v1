import Head from 'next/head';
import HomeView from '../src/views/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kai Wang</title>
      </Head>
      <HomeView></HomeView>
    </>
  );
}
