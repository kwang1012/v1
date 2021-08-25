import { createTheme } from '@material-ui/core/styles';

export const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#757ce8',
            main: '#CC3363',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        body: 'white',
        bodyConstract: 'black',
        backgroundColor: '#FAFBFC',
        shadow: '0 0 5px #00000070'
    },
});

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#CC3363'
        },
        body: 'black',
        bodyConstract: 'white',
        backgroundColor: '#010203',
        shadow: '0 0 2px #FFFFFF70'
    }
});