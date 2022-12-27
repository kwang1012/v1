import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

function initialiseAnalytics() {
  ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS_ID);
}

export function usePageTracking() {
  const router = useRouter();
  const location = router.pathname;
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initialiseAnalytics();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location);
    }
  }, [initialized, location]);
}
