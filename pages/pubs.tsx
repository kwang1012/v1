import Head from 'next/head';
import { ReactElement } from 'react';
import SimpleLayout from '@/layouts/simple-layout';
import PublicationView from '@/simpleViews/pubs';
import { normalize } from '@/utils';
import { api } from '@/utils/api';

type Props = {
  groups: any[];
};

export default function Publication({ groups }: Props) {
  return (
    <>
      <Head>
        <title>Kai Wang - Publications</title>
      </Head>
      <PublicationView groups={groups} />
    </>
  );
}

Publication.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export async function getServerSideProps() {
  const { data } = await api.get('publications', {
    params: {
      group: 'year',
      'sort[0]': 'date:desc',
    },
  });
  return {
    props: {
      groups: normalize(data),
    },
  };
}
