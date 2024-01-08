export const posts = {
  data: [
    {
      id: 1,
      attributes: {
        title: null,
        content: null,
        abstract: null,
        slug: null,
        stats: null,
        createdAt: '2023-11-09T20:14:42.552Z',
        updatedAt: '2023-11-09T20:14:44.391Z',
        publishedAt: '2023-11-09T20:14:44.388Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
};

export const fetchPosts = new Promise((resolve) => {
  resolve(posts);
});
