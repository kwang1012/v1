import Head from 'next/head';
import { ReactElement } from 'react';
import SimpleLayout from '@/layouts/simple-layout';
import PublicationView from '@/simpleViews/pubs';
import { normalize } from '@/utils';
import { api } from '@/utils/api';

type Props = {
  pubs: any[];
};

export default function Publication({ pubs }: Props) {
  return (
    <>
      <Head>
        <title>Kai Wang - Publications</title>
      </Head>
      <PublicationView pubs={pubs} />
    </>
  );
}

Publication.getLayout = function getLayout(page: ReactElement) {
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
