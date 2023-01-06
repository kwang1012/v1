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
import { backdropClasses, IconButton, Menu } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import BlogOutline from 'src/components/BlogOutline';
import { useEffect } from 'react';

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

  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [openOutline, setOpenOutline] = useState(false);
  const handleClick = (event) => {
    setOpenOutline(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenOutline(false);
  };

  return (
    <>
      <div className="relative">
        <BlogOutline
          id="normal"
          content={post.content}
          scrollOffset={scrollOffset}
          width={width}
          className="opacity-0 xl:opacity-100 transition-opacity flex fixed left-0 pt-24 pr-10 h-screen w-[calc(50%-400px)] flex-shrink-0 justify-end"
        />
        <IconButton
          className="xl:opacity-0 transition-opacity fixed bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16 bg-[#e6e6e6] text-[#868686] rounded-md shadow-app"
          onClick={handleClick}
          sx={{
            '&:hover': {
              backgroundColor: '#b6b6b6'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openOutline}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          elevation={0}
          container={anchorEl?.parentNode}
          className="xl:hidden"
          sx={{
            '& .MuiPaper-root': {
              padding: 2,
              border: '1px solid rgba(229, 231, 235, 1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
            '& .MuiList-root': {
              padding: 0,
            },
          }}
        >
          <BlogOutline id="menu" content={post.content} scrollOffset={scrollOffset} width={width} />
        </Menu>
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
