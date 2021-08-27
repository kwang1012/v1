import { Box, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import styles from 'styles/footer.module.scss';
// style={{ boxShadow: theme.palette.shadow }}

const initialFormValues = {
    name: '',
    email: '',
    message: ''
}

export default function ContactCard(props) {

    const [values, setValues] = useState(initialFormValues);

    const [errors, setErrors] = useState({});

    function handleInput(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        axios.post('/api/message', values).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setValues(initialFormValues);
            setErrors({});
        });
    }

    function validate(fieldValues = values) {

        let tmp = { ...errors };

        if ('name' in fieldValues) {
            tmp.name = fieldValues.message ? '' : 'Required';
        }

        if ('email' in fieldValues) {
            tmp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Required';
        }

        if ('message' in fieldValues) {
            tmp.message = fieldValues.message ? '' : 'Required';
        }

        setErrors({
            ...tmp
        });
    }

    return (
        <Box {...props}>
            <form onSubmit={handleFormSubmit}>
                <Box
                    display='flex' flexDirection='column' alignItems='center'
                    bgcolor="card.background"
                    width={1} height={1}
                    borderRadius={5}
                    px='5%' py={5}>

                    <Box component='h1' my='1.5vw'>Drop me a line</Box>
                    <Box display='grid' gridTemplateColumns='1fr 1fr' width={1}>
                        <Box mr={1}>
                            <Box component='h2' width={1} fontSize={14} ma={0} mb={1}>Name*</Box>
                            <TextField size="small" variant="outlined" fullWidth className={styles.input} name='name' value={values.name} onChange={handleInput} />
                        </Box>
                        <Box ml={1}>
                            <Box component='h2' width={1} fontSize={14} ma={0} mb={1}>Email Address*</Box>
                            <TextField size="small" variant="outlined" fullWidth className={styles.input} name='email' value={values.email} onChange={handleInput} /><br />
                        </Box>
                    </Box>
                    <Box component='h2' width={1} fontSize={14} my={1}>Message*</Box>
                    <TextField size="small" variant="outlined" fullWidth multiline={true} maxRows={3} name='message' value={values.message} onChange={handleInput} /><br />
                    <Box mt='auto'>
                        <Button className={styles.button} variant="outlined" color="primary" type='submit'>Send</Button>
                    </Box>
                </Box>
            </form >
        </Box>
    )
}