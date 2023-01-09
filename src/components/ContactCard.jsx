import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { forwardRef, useEffect, useState } from 'react';
import styles from 'styles/footer.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { useImperativeHandle } from 'react';
import { api } from 'src/utils/api';

const initialFormValues = {
  name: '',
  email: '',
  message: '',
};

const ContactCard = forwardRef(({ inputOnly, ...props }, ref) => {
  useImperativeHandle(ref, () => ({
    submit() {
      handleFormSubmit();
    },
  }));

  const [values, setValues] = useState(initialFormValues);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [sent, setSent] = useState(false);

  const [error, setError] = useState(null);

  // useEffect(validate, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  }

  function handleFormSubmit(e) {
    e?.preventDefault();
    setSent(false);
    if (validate()) {
      setLoading(true);
      api
        .post('messages', { data: values })
        .then(() => {
          setValues(initialFormValues);
          setSent(true);
          setErrors({});
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
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

    if ('message' in fieldValues) {
      if (fieldValues.message) {
        tmp.message = undefined;
      } else {
        tmp.message = 'Required';
        isValid = false;
      }
    }

    setErrors({
      ...tmp,
    });

    return isValid;
  }

  const inputFields = (
    <>
      <Box display="grid" gridTemplateColumns="1fr 1fr" width={1}>
        <Box mr={1}>
          <Box component="h2" width={1} fontSize={14} ma={0} mb={1}>
            Name*
          </Box>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            className={styles.input}
            name="name"
            value={values.name}
            onChange={handleInput}
            error={errors.name !== undefined}
          />
          {errors.name && (
            <Box component="label" fontSize={12} color="red">
              {errors.name}
            </Box>
          )}
        </Box>
        <Box ml={1}>
          <Box component="h2" width={1} fontSize={14} ma={0} mb={1}>
            Email Address*
          </Box>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            className={styles.input}
            name="email"
            value={values.email}
            onChange={handleInput}
            error={errors.email !== undefined}
          />
          <br />
          {errors.email && (
            <Box component="label" fontSize={12} color="red">
              {errors.email}
            </Box>
          )}
        </Box>
      </Box>
      <Box component="h2" width={1} fontSize={14} my={1}>
        Message*
      </Box>
      <Box width={1}>
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          multiline={true}
          maxRows={3}
          name="message"
          value={values.message}
          onChange={handleInput}
          error={errors.message !== undefined}
        />
        <br />
        {errors.message && (
          <Box component="label" fontSize={12} color="red">
            {errors.message}
          </Box>
        )}
        {sent && (
          <Box component="p" color="#5C9EAD">
            Your message has been sent!
          </Box>
        )}
        {error && (
          <Box component="p" color="red">
            {error}
          </Box>
        )}
      </Box>
    </>
  );

  return (
    <Box {...props}>
      <form onSubmit={handleFormSubmit}>
        {inputOnly ? (
          inputFields
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="card.background"
            width={1}
            height={1}
            borderRadius={5}
            px="5%"
            py={5}
          >
            {inputFields}
            <Box mt={5}>
              <Button className={styles.button} style={{ width: 200 }} variant="outlined" color="primary" type="submit">
                {loading ? <CircularProgress color="primary" size={24} /> : 'Send'}
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </Box>
  );
});

export default ContactCard;
