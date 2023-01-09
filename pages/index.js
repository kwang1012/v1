import Head from 'next/head';
import SimpleHomeView from 'src/simpleViews/home';
import HomeView from '../src/views/home';
import { api } from 'src/utils/api';
import { normalize } from 'src/utils';
import SimpleLayout from 'src/layouts/simple-layout';

export default function Home({ pubs, posts, isSimple }) {
  return (
    <>
      <Head>
        <title>Kai Wang</title>
      </Head>
      {isSimple ? <SimpleHomeView pubs={pubs} posts={posts} /> : <HomeView pubs={pubs}></HomeView>}
    </>
  );
}

Home.getLayout = function getLayout(page) {
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
  const isSimple = process.env.SIMPLE ? true : false;
  const props = {
    pubs: normalize(data),
    isSimple,
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
