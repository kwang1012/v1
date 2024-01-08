import Head from 'next/head';
import SimpleHomeView from 'src/simpleViews/home';
import HomeView from '../src/views/home';
import { api } from '@/utils/api';
import { normalize } from '@/utils';
import SimpleLayout from '@/layouts/simple-layout';
import { ReactElement } from 'react';
import { fetchPubs } from '@/const/pubs';
import { fetchExps } from '@/const/experiences';
import { fetchPosts } from '@/const/posts';
import { fetchNews } from '@/const/news';

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
