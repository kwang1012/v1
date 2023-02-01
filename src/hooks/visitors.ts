import { api } from '@/utils/api';
import axios from 'axios';
import { useEffect } from 'react';

export function useVisitor() {
  useEffect(() => {
    axios
      .get('https://ipgeolocation.abstractapi.com/v1/', {
        params: {
          api_key: '3e903d6215a942c9ba37f2c6dd0241d6',
        },
      })
      .then(({ data }) => {
        api.post('/monitor/visitors', {
          data,
        });
      })
      .catch(console.log);
  }, []);
}
