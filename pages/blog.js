import Head from 'next/head';
import SimpleLayout from 'src/layouts/simple-layout';
import BlogView from 'src/simpleViews/blog';
import { normalize } from 'src/utils';
import { api } from 'src/utils/api';

export default function Blog({ posts, categories, pagination }) {
  return (
    <>
      <Head>
        <title>Kai Wang - Blog</title>
      </Head>
      <BlogView posts={posts} categories={categories} pagination={pagination} />
    </>
  );
}

Blog.getLayout = function getLayout(page) {
  return <SimpleLayout contentWidth={1000}>{page}</SimpleLayout>;
};

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page || '1');
  var { data } = await api.get('posts', {
    params: {
      'sort[0]': 'createdAt:desc',
      'pagination[page]': page,
    },
  });
  const { pagination } = data.meta;
  const posts = normalize(data);
  var { data } = await api.get('post-categories');
  const categories = normalize(data);
  return {
    props: {
      posts,
      categories,
      pagination,
    },
  };
}
