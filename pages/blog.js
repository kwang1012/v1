import Head from 'next/head';
import BlogView from 'src/simpleViews/blog';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Kai Wang - Blog</title>
      </Head>
      <BlogView />
    </>
  );
}
