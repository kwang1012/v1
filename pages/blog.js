import Head from 'next/head';
import BlogView from 'src/simpleViews/blog';
import { api } from 'src/utils/api';

export default function Blog({posts}) {
  return (
    <>
      <Head>
        <title>Kai Wang - Blog</title>
      </Head>
      <BlogView posts={posts}/>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await api.get('posts');
  return {
    props: {
      posts: data.data.map(d => d.attributes),
    },
  };
}