import Head from 'next/head';
import { PublicationView } from 'src/views/publication';

export default function Publication() {
  return (
    <>
      <Head>
        <title>Kai Wang - Publications</title>
      </Head>
      <PublicationView></PublicationView>
    </>
  );
}
