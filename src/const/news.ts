export const news = {
  data: [
    {
      id: 4,
      attributes: {
        date: '2023-02-03',
        title: 'I got admitted to **PSU**!',
        highlighted: false,
        createdAt: '2023-10-27T23:07:58.494Z',
        updatedAt: '2023-10-27T23:08:47.793Z',
        publishedAt: '2023-10-27T23:07:59.026Z',
      },
    },
    {
      id: 6,
      attributes: {
        date: '2023-02-03',
        title: "One paper is accepted to *CLOSER'23*",
        highlighted: true,
        createdAt: '2023-10-27T23:08:34.099Z',
        updatedAt: '2023-10-27T23:08:39.265Z',
        publishedAt: '2023-10-27T23:08:39.263Z',
      },
    },
    {
      id: 3,
      attributes: {
        date: '2023-01-18',
        title: 'Graduated from NTHU!!',
        highlighted: false,
        createdAt: '2023-10-27T23:07:45.564Z',
        updatedAt: '2023-10-27T23:08:53.812Z',
        publishedAt: '2023-10-27T23:07:46.442Z',
      },
    },
    {
      id: 5,
      attributes: {
        date: '2023-01-14',
        title: 'I got admitted to **UIUC**!',
        highlighted: true,
        createdAt: '2023-10-27T23:08:13.500Z',
        updatedAt: '2023-10-27T23:08:59.286Z',
        publishedAt: '2023-10-27T23:08:14.106Z',
      },
    },
    {
      id: 1,
      attributes: {
        date: '2022-12-07',
        title: "Attend the conference, **PDCAT'22**, Sendai, Japan",
        highlighted: false,
        createdAt: '2023-10-27T23:07:13.374Z',
        updatedAt: '2023-10-27T23:07:14.112Z',
        publishedAt: '2023-10-27T23:07:14.108Z',
      },
    },
    {
      id: 2,
      attributes: {
        date: '2022-10-23',
        title: 'One paper is accepted to **PDCAT 2022**',
        highlighted: false,
        createdAt: '2023-10-27T23:07:29.086Z',
        updatedAt: '2023-10-27T23:09:04.006Z',
        publishedAt: '2023-10-27T23:07:33.921Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 6 } },
};

export const fetchNews = new Promise((resolve) => {
  resolve(news);
});
