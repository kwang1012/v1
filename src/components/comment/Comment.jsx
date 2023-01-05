import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatBubbleOutline, ThumbUpOutlined } from '@mui/icons-material';
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

export default function Comment({ comment, post }) {
  const themeValue = useSelector((state) => state.theme.value);
  const [editting, setEditting] = useState(false);

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
                <span className="text-[#cc3363] font-bold">{comment.name}</span>
                <span className="text-sm text-gray-400"> {moment(comment.createdAt).format('YYYY-MM-DD')}</span>
              </div>

              <ReactMarkdown
                className={`p-1 markdown-body small ${themeValue}`}
                children={comment.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              />
              {/* <div className="mt-3">{comment.content}</div> */}
            </div>
            <div className="w-10 flex items-center">
              <IconButton size="small" className="text-[#cc3363]">
                <ThumbUpOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small" className="text-[#cc3363]" onClick={() => setEditting(true)}>
                <ChatBubbleOutline fontSize="small" />
              </IconButton>
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
