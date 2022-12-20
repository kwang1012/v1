import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import ProjectCard from 'src/components/ProjectCard';
import styles from 'styles/project.module.scss';

const projectList = {
  itri: {
    name: 'Industrial Technology Research Institute (ITRI)',
    title: 'System Architect',
    period: 'Jul 2018 ~ Dec 2018',
    items: [
      {
        title: 'NVDLA',
      },
      {
        title: 'Implementation of CDP',
      },
      {},
      {},
    ],
  },
  twister5: {
    name: 'Twister 5',
    title: 'Full-stack developer',
    period: 'Dec 2020 ~ May 2021',
    items: [
      {
        title: 'BDE Admin Panel',
      },
      {
        title: 'Rest.js',
      },
    ],
  },
  skymizer: {
    name: 'Skymizer',
    title: 'System Architect',
    period: 'May 2021 ~ Present',
    items: [
      {
        title: 'Forest Runtime',
      },
      {
        title: 'Pipeline Parallelism',
      },
    ],
  },
};

export default function ProjectView({ project }) {
  const detail = useMemo(() => {
    return projectList[project] || {};
  }, [project]);
  const router = useRouter();
  return (
    <div className="px-[10%] pt-[50px] flex flex-col h-screen pb-10">
      <Button className="self-start" variant="text" onClick={() => router.back()}>
        Back
      </Button>
      <div className="px-40 pb-10 pt-10">
        <h1>{detail.name}</h1>
        <h2>{detail.title}</h2>
        <h3>{detail.period}</h3>
      </div>
      <div className={styles.projectList}>
        <div className={styles.list}>
          {detail.items?.map((item, i) => (
            <ProjectCard project={item} index={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
