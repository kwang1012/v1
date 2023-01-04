import BlogDetailView from 'src/simpleViews/blog-detail';
import Head from 'next/head';
import { api } from 'src/utils/api';
import { normalize } from 'src/utils';

export default function BlogDetail({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <BlogDetailView post={post} />
    </>
  );
}

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
