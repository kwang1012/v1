import React from 'react';
import PropTypes from 'prop-types';
import 'styles/globals.css';
import 'styles/calendar.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useSelector } from 'react-redux';
import { wrapper, store, persistor } from 'src/store';
import { darkTheme, lightTheme } from 'styles/theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme } from '@mui/material/styles';

library.add(fab);

function App({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const theme = useSelector(state => state.theme.value);

  const Theme = theme === 'light' ? createTheme(lightTheme) : createTheme(darkTheme);

  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(App);