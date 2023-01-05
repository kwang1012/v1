
const baseTheme = {
    spacing: 4
}

export const lightTheme = {
    ...baseTheme,
    palette: {
        mode: 'light',
        type: 'light',
        primary: {
            light: '#757ce8',
            main: '#CC3363',
            dark: '#bf2857',
            contrastText: 'white',
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
        background: {
            default: '#FAFBFC'
        },
        text: {
            primary: '#000000'
        },
        shadow: '0 0 5px #00000070',
        card: {
            background: 'white',
            shadow: '0 0 5px #00000070'
        },
        footer: {
            text: '#4C5270',
        }
    },
};

export const darkTheme = {
    ...baseTheme,
    palette: {
        mode: 'dark',
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
        background: {
            default: '#010203'
        },
        text: {
            primary: '#ffffff'
        },
        shadow: '0 0 2px #FFFFFF70',
        card: {
            background: '#212223',
            shadow: '0 0 2px #FFFFFF70'
        },
        footer: {
            text: '#CC3363',
        }
    }
};