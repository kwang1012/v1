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
  news: any[];
  exps: any[];
  isSimple: boolean;
};

export default function Home({ pubs, posts, exps, news, isSimple }: Props) {
  return (
    <>
      <Head>
        <title>Kai Wang</title>
      </Head>
      {isSimple ? (
        <SimpleHomeView pubs={pubs} posts={posts} exps={exps} news={news} />
      ) : (
        <HomeView pubs={pubs}></HomeView>
      )}
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
  const fetchPubs = api
    .get('publications', {
      params: {
        'sort[0]': 'date:desc',
        'filters[selected][$eq]': true,
      },
    })
    .then(({ data }) => data);
  const fetchPosts = api
    .get('posts', {
      params: {
        'sort[0]': 'createdAt:desc',
      },
    })
    .then(({ data }) => data);
  const fetchExps = api
    .get('experiences', {
      params: {
        'sort[0]': 'startDate:asc',
      },
    })
    .then(({ data }) => data);
  const fetchNews = api
    .get('news', {
      params: {
        'sort[0]': 'date:desc',
      },
    })
    .then(({ data }) => data);
  const results = await Promise.all([fetchPubs, fetchPosts, fetchExps, fetchNews]);
  const isSimple = process.env.SIMPLE === 'true';
  return {
    props: {
      pubs: normalize(results[0]),
      posts: normalize(results[1]).slice(0, 2),
      exps: normalize(results[2]),
      news: normalize(results[3]),
      isSimple,
    },
  };
}
