export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send({
      id: 1,
      title: 'Post 1',
      abstract: "Post's abstract",
      createdAt: new Date(),
      content:
        "This is a dummy post's content. We suggest you to build your own backend server or clone the project(https://github.com/kwang1012/kkapp)",
      slug: 'post1',
      post_category: {
        name: 'Dummy',
      },
    });
  } else {
    res.status(404).send(`${req.method} /posts/[slug] not found.`);
  }
}
