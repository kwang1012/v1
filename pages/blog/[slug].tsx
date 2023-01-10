import BlogDetailView from 'src/simpleViews/blog-detail';
import Head from 'next/head';
import { api } from '@/utils/api';
import { normalize } from '@/utils';
import SimpleLayout from 'src/layouts/simple-layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { GetServerSideProps } from 'next';

type Props = {
  post: any;
};

export default function BlogDetail({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title} | Kai Wang</title>
      </Head>
      <BlogDetailView post={post} />
    </>
  );
}

BlogDetail.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout layout={null}>{page}</SimpleLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as any;
  try {
    const { data } = await api.get(`posts/${slug}`);
    return {
      props: {
        post: normalize(data),
      },
    };
  } catch (e) {
    return {
      props: {},
      redirect: {
        permanet: true,
        destination: '/blog',
      },
    };
  }
};
