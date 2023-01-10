import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { usePageTracking } from '@/hooks/ga';
import CommentBlock from '@/components/comment/CommentBlock';
import { useEffect } from 'react';
import BlogOutline from 'src/components/BlogOutline';
import Link from 'next/link';
import { RootState } from '@/store';

type Props = {
  post: any;
};

export default function BlogDetailView({ post }: Props) {
  const themeValue = useSelector((state: RootState) => state.theme.value);

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
            <div className="bg-primary py-[2px] px-2 rounded-sm table text-white text-sm">
              {post.post_category?.name}
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
          {post.related_posts?.length > 0 && <h3 className="mt-20 text-primary">Maybe you'd like to read...</h3>}
          <div className="flex scrollbar w-full horz">
            {post.related_posts?.map((related_post: any, i: number) => (
              <Link
                key={i}
                href={{
                  pathname: '/blog/[slug]',
                  query: {
                    slug: related_post.slug,
                  },
                }}
              >
                <div className="flex flex-col w-60 aspect-[16/10] flex-shrink-0 mr-2 shadow-md border border-solid border-gray-200 p-3 rounded-md text-left cursor-pointer hover:shadow-2xl transition-shadow">
                  <div className="text-lg font-bold line-clamp-1">{related_post.title}</div>
                  <div className="line-clamp-2 mt-3">{related_post.abstract}</div>
                  <div className="flex justify-end text-primary mt-auto cursor-pointer text-sm">Read More</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
