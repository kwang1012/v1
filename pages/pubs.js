import Head from 'next/head';
import PublicationView from 'src/simpleViews/pubs';
import { normalize } from 'src/utils';
import { api } from 'src/utils/api';

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

// This function gets called at build time
export async function getServerSideProps() {
  const { data } = await api.get('publications', {
    params: {
      'sort[0]': 'date:desc',
    },
  });
  return {
    props: {
      pubs: normalize(data),
    },
  };
}
