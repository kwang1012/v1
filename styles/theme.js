import { createTheme } from '@material-ui/core/styles';

export const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#757ce8',
            main: '#CC3363',
            dark: '#002884',
            contrastText: 'black',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            // contrastText: '#000',
        },
        accent: {
            main: '#36EEE0'
        },
        tiffany: {
            main: '#BCECE0'
        },
        body: 'white',
        bodyConstract: 'black',
        backgroundColor: '#FAFBFC',
        shadow: '0 0 5px #00000070',
        cardBackground: 'white',
        footerText: '#4C5270'
    },
});

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#CC3363'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            // contrastText: '#000',
        },
        accent: {
            main: '#36EEE0'
        },
        tiffany: {
            main: '#BCECE0'
        },
        body: 'black',
        bodyConstract: 'white',
        backgroundColor: '#010203',
        shadow: '0 0 2px #FFFFFF70',
        cardBackground: '#212223',
        footerText: '#CC3363',
    }
});