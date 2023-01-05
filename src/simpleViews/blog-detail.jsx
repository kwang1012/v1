import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';
import { flat } from 'src/utils';
import moment from 'moment';
import { usePageTracking } from 'src/hooks/ga';
import ReactGA from 'react-ga';
import CommentBlock from 'src/components/comment/CommentBlock';

function collectHeaders(el, n, position) {
  if (n === 6)
    return {
      title: el.textContent,
      el,
      children: [],
      active: false,
      id: 'app-outline-' + String(n) + String(position),
    };
  const list = [];
  let nextEl = el.nextElementSibling;
  while (nextEl && nextEl.tagName !== el.tagName) {
    if (nextEl.tagName === `H${n + 1}`) {
      list.push(nextEl);
    }
    nextEl = nextEl.nextElementSibling;
  }
  const subHeaders = list.map((h, i) => collectHeaders(h, n + 1, i));
  return {
    title: el.textContent,
    el,
    children: subHeaders,
    active: false,
    id: 'app-outline-' + String(n) + String(position),
  };
}

function Header({ h, level }) {
  return (
    <>
      <div
        id={h.id}
        onClick={() => {
          const y = h.el.offsetTop - 70;
          scrollTo({
            top: y,
            behavior: 'smooth',
          });
        }}
        style={{
          paddingLeft: `${level * 8}px`,
          fontSize: `${13 - level}px`,
          fontWeight: h.active && 'bold',
          color: h.active ? '#CC3363' : '#767676',
        }}
        className="cursor-pointer mb-1"
      >
        {h.title}
      </div>
      {h.children.map((child, i) => (
        <Header key={i} h={child} level={level + 1} />
      ))}
    </>
  );
}

export default function BlogDetailView({ post }) {

  const themeValue = useSelector((state) => state.theme.value);
  const headers = [
    { field: 'university', headerName: 'university' },
    {
      field: 'offer',
      headerName: 'offer',
      width: 75,
      renderCell: (params) => {
        if (params.value === null || params.value === undefined) return <></>;
        return params.value ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : (
          <FontAwesomeIcon icon={faXmark} color="red" />
        );
      },
    },
    { field: 'notifyDate', headerName: 'notify date' },
    { field: 'interview1', headerName: 'interview 1' },
    { field: 'interview2', headerName: 'interview 2' },
    { field: 'interview3', headerName: 'interview 3' },
  ];
  headers.forEach((header) => {
    if (!header.width) header.flex = 1;
    header.align = 'center';
    header.headerAlign = 'center';
    header.sortable = false;
    header.backgroundColor = 'red';
  });

  const [scrollOffset, setScrollOffset] = useState(window.pageYOffset);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollOffset(position);
  };
  const handleUnload = () => {};

  const [headerList, setHeaderList] = useState([]);
  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
  useEffect(() => {
    // top level header
    for (let h = 1; h <= 6; h++) {
      const list = [];
      const hs = document.querySelectorAll(`.markdown-content h${h}`);
      hs.forEach((h2, i) => {
        list.push(collectHeaders(h2, h, i));
      });
      if (hs.length !== 0) {
        setHeaderList(list);
        return;
      }
    }
  }, [post.content]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const flatList = flat(headerList);
    let height = 0;
    for (const [i, h] of Object.entries(flatList)) {
      if (h.el.getBoundingClientRect().y > 80 || parseInt(i) === flatList.length - 1) {
        flatList.forEach((el, idx) => {
          if (idx < i || (i === '0' && idx === 0) || h.el.getBoundingClientRect().y <= 80) {
            const tab = document.getElementById(el.id);
            if (!tab) return;
            const style = getComputedStyle(tab);
            height += parseFloat(style.height) + parseFloat(style.marginBottom);
          }
          if (h.el.getBoundingClientRect().y <= 80) {
            el.active = parseInt(i) === flatList.length - 1 && idx === flatList.length - 1;
          } else el.active = idx === i - 1 || (i === '0' && idx === 0);
        });
        return setProgress(height - 4);
      }
    }
  }, [scrollOffset, headerList]);

  usePageTracking();

  return (
    <>
      <div className="flex relative px-[calc(50%-400px)]">
        <div className="fixed left-0 pt-24 pr-10 h-screen w-[calc(50%-400px)] flex-shrink-0 flex justify-end">
          <div className="w-[2px] h-10 bg-[#CC3363] mr-5 transition-all" style={{ height: `${progress}px` }} />
          <div>
            {headerList.map((h, i) => (
              <Header key={i} h={h} level={0} />
            ))}
          </div>
        </div>
        <div className="pt-24 px-5 w-[800px] mx-auto">
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
            children={post.content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
          <CommentBlock post={post}/>
        </div>
      </div>
    </>
  );
}
