import { Paper } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectView from '@/views/project';

export default function Project() {
  const router = useRouter();
  const { slug } = router.query;

  return <ProjectView project={slug} />;
}
