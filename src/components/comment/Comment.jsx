import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatBubble, ChatBubbleOutline, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import moment from 'moment';
import { ReactSVG } from 'react-svg';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import InputBlock from './InputBlock';
import { useState } from 'react';
import { api } from 'src/utils/api';
import { normalize } from 'src/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thumb } from 'src/store/local';

export default function Comment({ comment, post }) {
  const themeValue = useSelector((state) => state.theme.value);
  const [editting, setEditting] = useState(false);

  const [like, setLike] = useState(comment.like);
  useEffect(() => {
    setLike(like);
  }, [comment.like]);
  const fetchComments = (isMounted) => {
    setLoading(true);
    api
      .get('comments', {
        params: {
          parent: comment.id,
        },
      })
      .then(({ data }) => {
        if (isMounted) setComments(normalize(data));
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
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
  const thumbUp = useSelector((state) => state.local.likes[comment.id]);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex my-2 items-start">
        <div className="w-12 flex justify-center">
          {comment.avatar ? (
            <ReactSVG src={comment.avatar} className="w-12 h-12" />
          ) : (
            <FontAwesomeIcon icon={faUser} style={{ fontSize: 30 }} color="grey" />
          )}
        </div>
        <div className="flex-1 ml-3">
          <div className="flex items-start">
            <div className="flex-1">
              <div>
                <span className="text-primary font-bold cursor-pointer">{comment.name}</span>
                <span className="text-sm text-gray-400"> {moment(comment.createdAt).format('YYYY-MM-DD')}</span>
              </div>

              {comment.parent && (
                <div className="text-sm px-1 my-2 text-gray-600">
                  Reply <span className="cursor-pointer text-blue-500 font-bold">@{comment.parent.name}</span>:
                </div>
              )}

              <ReactMarkdown
                className={`p-1 markdown-body small ${themeValue}`}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {comment.content}
              </ReactMarkdown>
            </div>
            <div className="flex items-center">
              <IconButton
                size="small"
                className="text-primary p-1"
                onClick={() => {
                  dispatch(thumb(comment.id));
                  setLike((like) => like + (!thumbUp ? 1 : -1));
                  api
                    .patch(`/comment/${!thumbUp ? 'like' : 'unlike'}`, null, {
                      params: {
                        id: comment.id,
                      },
                    })
                    .then(() => {
                      api
                        .get('/comment/like/view', {
                          params: {
                            id: comment.id,
                          },
                        })
                        .then(({ data }) => {
                          setLike(data);
                        });
                    })
                    .catch(() => {
                      dispatch(thumb(comment.id));
                      setLike((like) => like - (!thumbUp ? 1 : -1));
                    });
                }}
              >
                {thumbUp ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
              </IconButton>
              {like !== 0 && <span className="text-primary text-sm">{like}</span>}
              <IconButton size="small" className="text-primary p-1" onClick={() => setEditting(true)}>
                {comment.children.count ? <ChatBubble fontSize="small" /> : <ChatBubbleOutline fontSize="small" />}
              </IconButton>
              {comment.children.count !== 0 && <span className="text-primary text-sm">{comment.children.count}</span>}
            </div>
          </div>
          {editting && (
            <InputBlock
              post={post}
              parent={comment}
              onCancel={() => setEditting(false)}
              onSent={(data) => {
                setComments((cs) => [data, ...cs]);
                setEditting(false);
              }}
            />
          )}
          {comments.map((comment) => (
            <Comment post={post} comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </>
  );
}
