import InputBlock from './InputBlock';
import Comment from './Comment';
import { useEffect } from 'react';
import { api } from 'src/utils/api';
import { normalize } from 'src/utils';
import { useState } from 'react';

export default function CommentBlock({ post }) {
  const fetchComments = (isMounted) => {
    setLoading(true);
    api
      .get('comments', {
        params: {
          post: post.id,
        },
      })
      .then(({ data }) => {
        if (isMounted) setComments(normalize(data));
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
    api
      .get('comments/count/view', {
        params: {
          post: post.id,
        },
      })
      .then(({ data }) => {
        if (isMounted) setCount(data);
      })
      .catch(console.log);
  };
  useEffect(() => {
    let isMounted = true;
    fetchComments(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(null);
  return (
    <div className="mt-36 min-h-[400px] shadow-md p-8 border border-solid border-gray-200 rounded-md">
      <InputBlock
        post={post}
        onSent={(data) => {
          setComments((cs) => [data, ...cs]);
        }}
      />

      {!loading && (
        <>{count ? <h3 className="mb-6">{count} comments</h3> : <p className="text-center">no comment</p>}</>
      )}

      {comments.map((comment) => (
        <Comment post={post} comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
