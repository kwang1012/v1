import { Box, TextField, Button } from "@material-ui/core";
import styles from 'styles/footer.module.scss';
// style={{ boxShadow: theme.palette.shadow }}
export default function ContactCard() {
    return (
        <Box
            display='flex' flexDirection='column' alignItems='center'
            bgcolor="card.background"
            width={800} height='60vh'
            borderRadius={5}
            px='5%' py={5}>
            <Box component='h1' fontSize={30} mb={10}>Drop me a line</Box>
            <Box display='grid' gridTemplateColumns='1fr 1fr' width={1}>
                <Box mr={1}>
                    <Box component='h2' width={1} fontSize={14} ma={0} mb={1}>Name (required)</Box>
                    <TextField size="small" variant="outlined" fullWidth className={styles.input} />
                </Box>
                <Box ml={1}>
                    <Box component='h2' width={1} fontSize={14} ma={0} mb={1}>Email Address (required)</Box>
                    <TextField size="small" variant="outlined" fullWidth className={styles.input} /><br />
                </Box>
            </Box>
            <Box component='h2' width={1} fontSize={14} my={1}>Message (required)</Box>
            <TextField size="small" variant="outlined" fullWidth multiline={true} maxRows={3} /><br />
            <Box mt='auto'>
                <Button className={styles.button} variant="outlined" color="primary">Send</Button>
            </Box>
        </Box>
    )
}