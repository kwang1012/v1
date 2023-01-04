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
import { useRouter } from 'next/router';
import SimpleLayout from 'src/layouts/simple-layout';
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { api } from 'src/utils/api';
import { ChatBubbleOutline, ThumbUpOutlined } from '@mui/icons-material';

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

const initialFormValues = {
  name: '',
  email: '',
  content: '',
};

export default function BlogDetailView({ post }) {
  const [values, setValues] = useState(initialFormValues);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [sent, setSent] = useState(false);

  const [error, setError] = useState(null);

  function handleInput(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      api
        .post('/comments', {
          data: {
            ...values,
            post: post.id,
          },
        })
        .then(() => {
          setValues(initialFormValues);
          setSent(true);
          setError(null);
          refreshData();
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          // setValues(initialFormValues);
          setErrors({});
          setLoading(false);
        });
    }
  }

  function validate(fieldValues = values) {
    let tmp = { ...errors };

    let isValid = true;

    if ('name' in fieldValues) {
      if (fieldValues.name) {
        tmp.name = undefined;
      } else {
        tmp.name = 'Required';
        isValid = false;
      }
    }

    if ('email' in fieldValues) {
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)) {
        tmp.email = undefined;
      } else {
        tmp.email = 'Please provide a valid email';
        isValid = false;
      }
    }

    if ('content' in fieldValues) {
      if (fieldValues.content) {
        tmp.content = undefined;
      } else {
        tmp.content = 'Required';
        isValid = false;
      }
    }

    setErrors({
      ...tmp,
    });

    return isValid;
  }

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
      const hs = document.querySelectorAll(`.markdown-body h${h}`);
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
        return setProgress(height);
      }
    }
  }, [scrollOffset, headerList]);

  usePageTracking();
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  return (
    <SimpleLayout layout={null}>
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
            className={`markdown-body ${themeValue}`}
            children={post.content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
          <div className="mt-36 min-h-[400px] shadow-md p-8 border border-solid border-gray-200 rounded-md">
            <div className="flex mb-2">
              <div className=" w-40">
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="name"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Name</InputAdornment>,
                  }}
                  value={values.name}
                  onChange={handleInput}
                  error={errors.name !== undefined}
                />
                {errors.name && (
                  <Box component="label" fontSize={12} color="red">
                    {errors.name}
                  </Box>
                )}
              </div>
              <div className="ml-1 flex-1">
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="email"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Email</InputAdornment>,
                  }}
                  value={values.email}
                  onChange={handleInput}
                  error={errors.email !== undefined}
                />
                {errors.email && (
                  <Box component="label" fontSize={12} color="red">
                    {errors.email}
                  </Box>
                )}
              </div>
            </div>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              multiline={true}
              rows={4}
              name="content"
              value={values.content}
              onChange={handleInput}
              error={errors.content !== undefined}
              placeholder="You will receive an email if anybody replies you."
            />
            {errors.content && (
              <Box component="label" fontSize={12} color="red">
                {errors.content}
              </Box>
            )}
            {/* {sent && (
              <Box component="p" color="#5C9EAD">
                Your message has been sent!
              </Box>
            )} */}
            {error && (
              <Box component="p" color="red">
                {error}
              </Box>
            )}
            <div className="flex justify-end mt-3">
              <Button size="small" variant="outlined" onClick={handleFormSubmit} disabled={loading}>
                {loading ? <CircularProgress color="primary" size={23} /> : 'Send'}
              </Button>
            </div>
            <h3 className="mb-6">{post.comments.length} comments</h3>
            {post.comments.map((comment, i) => (
              <div className="flex mb-4 items-start" key={i}>
                <div className="w-10">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 40 }} color="grey" />
                </div>
                <div className="flex-1 ml-5">
                  <div>
                    <span className="text-[#cc3363] font-bold">{comment.name}</span>
                    <span className="text-sm text-gray-400"> {moment(comment.createdAt).format('YYYY-MM-DD')}</span>
                  </div>
                  <div className="mt-3">{comment.content}</div>
                </div>
                <div className="w-10 flex items-center">
                  <IconButton size="small" className="text-[#cc3363]">
                    <ThumbUpOutlined fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className="text-[#cc3363]">
                    <ChatBubbleOutline fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
