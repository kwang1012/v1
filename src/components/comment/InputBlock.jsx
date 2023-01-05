import { Box, Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Face } from '@mui/icons-material';
import Input from '../form/Input';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/router';
import { api } from 'src/utils/api';
import { useState } from 'react';
import { createAvatar } from '@dicebear/avatars';
import { useEffect } from 'react';
import * as style from '@dicebear/adventurer';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { normalize } from 'src/utils';

const initialFormValues = {
  name: '',
  email: '',
  content: '',
};

export default function InputBlock({
  post,
  parent,
  onCancel,
  onSent = () => {},
  initAvatar = createAvatar(style, {
    dataUri: true,
  }),
}) {
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
            avatar,
            post: post.id,
            parent: parent?.id,
          },
        })
        .then(({ data }) => {
          setValues(initialFormValues);
          setSent(true);
          setErrors({});
          setLoading(false);
          onSent(normalize(data));
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
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
  const router = useRouter();
  const [avatar, setAvatar] = useState(initAvatar);
  useEffect(() => {
    const svg = createAvatar(style, {
      dataUri: true,
    });
    setAvatar(svg);
  }, []);
  const [preview, setPreview] = useState(false);
  const themeValue = useSelector((state) => state.theme.value);
  return (
    <div className="flex items-start">
      <div className="flex items-center pr-2">
        <ReactSVG src={avatar} className="w-12 h-12 cursor-pointer" />
      </div>
      <div className="flex-1">
        <div className="flex mb-2">
          <div className="w-48">
            <Input
              size="small"
              fullWidth
              name="name"
              InputProps={{
                startAdornment: <InputAdornment position="start">Name</InputAdornment>,
              }}
              value={values.name}
              onChange={handleInput}
              error={errors.name !== undefined}
              placeholder="required"
            />
            {/* {errors.name && (
                <Box component="label" fontSize={12} color="red">
                  {errors.name}
                </Box>
              )} */}
          </div>
          <div className="ml-1 flex-1">
            <Input
              size="small"
              fullWidth
              name="email"
              InputProps={{
                startAdornment: <InputAdornment position="start">Email</InputAdornment>,
              }}
              value={values.email}
              onChange={handleInput}
              error={errors.email !== undefined}
              placeholder="required"
            />
            {/* {errors.email && (
                <Box component="label" fontSize={12} color="red">
                  {errors.email}
                </Box>
              )} */}
          </div>
        </div>
        <div className="flex">
          <div
            className="mr-1 p-1 border rounded-[4px] border-solid flex-1 h-[109px] scrollbar"
            style={{
              borderColor: themeValue === 'light' ? 'rgba(0,0,0,0.23)' : 'rgba(255,255,255,0.23)',
            }}
          >
            <TextField
              className="text-sm"
              size="small"
              fullWidth
              multiline
              variant="standard"
              name="content"
              value={values.content}
              onChange={handleInput}
              error={errors.content !== undefined}
              sx={{
                '& .MuiInputBase-root': {
                  overflow: 'auto',
                },
                '& .MuiInputBase-input': {
                  overflow: 'hidden',
                },
              }}
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              placeholder="You will receive an email if anybody replies you."
            />
          </div>
          {preview && (
            <div
              className="ml-1 border rounded-[4px] border-solid flex-1 h-[109px] scrollbar"
              style={{
                borderColor: themeValue === 'light' ? 'rgba(0,0,0,0.23)' : 'rgba(255,255,255,0.23)',
              }}
            >
              <ReactMarkdown
                className={`p-1 markdown-body small ${themeValue} `}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {values.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {/* {errors.content && (
            <Box component="label" fontSize={12} color="red">
              {errors.content}
            </Box>
          )} */}
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
        <div className="flex justify-between mt-3 items-start">
          <Tooltip
            title="change avatar"
            PopperProps={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -10],
                  },
                },
              ],
            }}
          >
            <IconButton className="p-0">
              <Face />
            </IconButton>
          </Tooltip>
          <div className="flex items-center">
            <a
              href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faMarkdown} className="cursor-pointer text-gray-500" />
            </a>
            {onCancel && (
              <Button size="small" variant="outlined" disableElevation className="ml-2" onClick={onCancel}>
                <span className="normal-case">Cancel</span>
              </Button>
            )}
            <Button
              size="small"
              variant="outlined"
              disableElevation
              className="mx-2"
              onClick={() => setPreview((state) => !state)}
            >
              <span className="normal-case">Preview</span>
            </Button>
            <Button size="small" variant="contained" onClick={handleFormSubmit} disabled={loading} disableElevation>
              <span className="normal-case">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
