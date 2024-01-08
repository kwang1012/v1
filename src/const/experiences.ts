export const exps = {
  data: [
    {
      id: 4,
      attributes: {
        title: 'DPRG group',
        link: 'https://dprg.cs.uiuc.edu/',
        corp: 'UIUC',
        place: 'CU, Illinois',
        position: 'PhD',
        startDate: '2023-08-16',
        endDate: null,
        advisor: 'Prof. Indranil Gupta',
        projects: ['Smart Home'],
        createdAt: '2023-10-27T23:16:30.426Z',
        updatedAt: '2023-10-27T23:16:31.024Z',
        publishedAt: '2023-10-27T23:16:31.019Z',
      },
    },
    {
      id: 3,
      attributes: {
        title: 'Skymizer',
        link: 'https://skymizer.com/',
        corp: null,
        place: 'Taipei, Taiwan',
        position: 'System Architect',
        startDate: '2021-05-01',
        endDate: '2023-03-10',
        advisor: null,
        projects: ['Forest Runtime', 'Pipeline Parallelism for Deep Learning'],
        createdAt: '2023-10-27T23:15:24.142Z',
        updatedAt: '2023-10-27T23:15:24.795Z',
        publishedAt: '2023-10-27T23:15:24.792Z',
      },
    },
    {
      id: 2,
      attributes: {
        title: 'LSA Lab',
        link: 'https://lsalab.cs.nthu.edu.tw',
        corp: 'National Tsing Hua University',
        place: 'Hsichu, Taiwan',
        position: 'Research Assistant',
        startDate: '2021-03-01',
        endDate: '2023-01-31',
        advisor: 'Prof. Jerry Chou',
        projects: ['Scheduling in embedded systems with memory constraints', 'Big Data', 'Cloud computing'],
        createdAt: '2023-10-27T23:14:18.568Z',
        updatedAt: '2023-10-27T23:14:19.407Z',
        publishedAt: '2023-10-27T23:14:19.404Z',
      },
    },
    {
      id: 1,
      attributes: {
        title: 'HSCC Lab',
        link: 'http://hscc.cs.nthu.edu.tw/2011newpage/sh1-1.htm',
        corp: 'National Tsing Hua University',
        place: 'Hsichu, Taiwan',
        position: 'Research Assistant',
        startDate: '2020-09-01',
        endDate: '2021-01-31',
        advisor: 'Prof. Jang-Ping Sheu',
        projects: ['CNN Parallelization with Raspberry PI'],
        createdAt: '2023-10-27T23:12:56.204Z',
        updatedAt: '2023-10-27T23:12:56.884Z',
        publishedAt: '2023-10-27T23:12:56.882Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 4 } },
};

export const fetchExps = new Promise((resolve) => {
  resolve(exps);
});
