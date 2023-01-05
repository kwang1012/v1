import Head from 'next/head';
import SimpleLayout from 'src/layouts/simple-layout';
import ExperienceView from 'src/simpleViews/experience';

export default function Experience() {
  return (
    <>
      <Head>
        <title>Kai Wang - Experiences</title>
      </Head>
      <ExperienceView />
    </>
  );
}

Experience.getLayout = function getLayout(page) {
  return <SimpleLayout>{page}</SimpleLayout>;
};
