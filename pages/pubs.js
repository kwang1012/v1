import Head from 'next/head';
import SimpleLayout from 'src/layouts/simple-layout';
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

Publication.getLayout = function getLayout(page) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

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
