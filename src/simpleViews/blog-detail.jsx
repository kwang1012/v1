import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { usePageTracking } from 'src/hooks/ga';
import CommentBlock from 'src/components/comment/CommentBlock';
import { useEffect } from 'react';
import BlogOutline from 'src/components/BlogOutline';

export default function BlogDetailView({ post }) {
  const themeValue = useSelector((state) => state.theme.value);

  usePageTracking();

  const [scrollOffset, setScrollOffset] = useState(window.pageYOffset);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollOffset(position);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    handleScroll();
    setWidth(window.innerWidth);
  };

  const handleUnload = () => {};

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <BlogOutline content={post.content} scrollOffset={scrollOffset} width={width} />
        <div className="pt-24 px-5 max-w-[800px] mx-auto">
          <div className="flex justify-between items-center">
            <div className="bg-[#CC3363] py-[2px] px-2 rounded-sm table text-white text-sm">
              {post.post_category.name}
            </div>
            <div className="flex mt-3 items-center">
              <FontAwesomeIcon icon={faUser} />
              <span className="ml-1 text-sm">Kai</span>
              <FontAwesomeIcon className="ml-4" icon={faCalendar} />
              <span className="ml-1 text-sm">{moment(post.createdAt).format('MM/DD/YYYY')}</span>
            </div>
          </div>
          <h1 className="text-3xl mb-10">{post.title}</h1>
          <ReactMarkdown
            className={`markdown-body markdown-content ${themeValue}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
          <CommentBlock post={post} />
        </div>
      </div>
    </>
  );
}
