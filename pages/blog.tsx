import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import SimpleLayout from '@/layouts/simple-layout';
import BlogView from '@/simpleViews/blog';
import { normalize } from '@/utils';
import { api } from '@/utils/api';

type Props = {
  posts: any[];
  categories: any[];
  pagination: any;
};

export default function Blog({ posts, categories, pagination }: Props) {
  return (
    <>
      <Head>
        <title>Kai Wang - Blog</title>
      </Head>
      <BlogView posts={posts} categories={categories} pagination={pagination} />
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout contentWidth={1000}>{page}</SimpleLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt((query.page as string) || '1');
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
};
