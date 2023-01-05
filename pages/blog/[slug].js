import BlogDetailView from 'src/simpleViews/blog-detail';
import Head from 'next/head';
import { api } from 'src/utils/api';
import { normalize } from 'src/utils';
import SimpleLayout from 'src/layouts/simple-layout';

export default function BlogDetail({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | Kai Wang</title>
      </Head>
      <BlogDetailView post={post} />
    </>
  );
}

BlogDetail.getLayout = function getLayout(page) {
  return <SimpleLayout layout={null}>{page}</SimpleLayout>;
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const { data } = await api.get(`posts/${slug}`);
    return {
      props: {
        post: normalize(data),
      },
    };
  } catch {
    return {
      redirect: {
        permanet: true,
        destination: '/blog',
      },
    };
  }
}
