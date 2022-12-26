import { useRouter } from 'next/router';
import BlogDetailView from 'src/simpleViews/blog-detail';
import Head from 'next/head';

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>2023 Fall CS PhD申請總結</title>
      </Head>
      <BlogDetailView blog={slug} />
    </>
  );
}
