import Head from 'next/head';
import { ReactElement } from 'react';
import SimpleLayout from '@/layouts/simple-layout';
import ExperienceView from '@/simpleViews/experience';
import { api } from '@/utils/api';
import { normalize } from '@/utils';

export default function Experience({ exps }: { exps: any[] }) {
  return (
    <>
      <Head>
        <title>Kai Wang - Experiences</title>
      </Head>
      <ExperienceView exps={exps} />
    </>
  );
}

Experience.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export async function getServerSideProps() {
  const { data } = await api.get('experiences', {
    params: {
      'sort[0]': 'startDate:asc',
    },
  });
  return {
    props: {
      exps: normalize(data),
    },
  };
}
