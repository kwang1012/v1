import Head from 'next/head';
import SimpleHomeView from 'src/simpleViews/home';
import HomeView from '../src/views/home';
import { api } from '@/utils/api';
import { normalize } from '@/utils';
import SimpleLayout from '@/layouts/simple-layout';
import { ReactElement } from 'react';

type Props = {
  pubs: any[];
  posts: any[];
  isSimple: boolean;
};

export default function Home({ pubs, posts, isSimple }: Props) {
  return (
    <>
      <Head>
        <title>Kai Wang</title>
      </Head>
      {isSimple ? <SimpleHomeView pubs={pubs} posts={posts} /> : <HomeView pubs={pubs}></HomeView>}
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return page.props.isSimple ? (
    <SimpleLayout contentWidth={900} paddingTop={160}>
      {page}
    </SimpleLayout>
  ) : (
    page
  );
};

// This function gets called at build time
export async function getServerSideProps() {
  const { data } = await api.get('publications', {
    params: {
      'sort[0]': 'date:desc',
      'filters[selected][$eq]': true,
    },
  });
  const isSimple = process.env.SIMPLE === 'true';
  const props = {
    pubs: normalize(data),
    isSimple,
    posts: null,
  };
  if (isSimple) {
    try {
      const { data: d } = await api.get('posts', {
        params: {
          'sort[0]': 'createdAt:desc',
        },
      });
      props.posts = normalize(d).slice(0, 2);
    } catch {}
  }
  return {
    props,
  };
}
