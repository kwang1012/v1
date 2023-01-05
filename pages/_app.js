import React from 'react';
import PropTypes from 'prop-types';
import 'styles/globals.css';
import 'styles/calendar.css';
import 'styles/markdown.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useSelector } from 'react-redux';
import { wrapper, store, persistor } from 'src/store';
import { darkTheme, lightTheme } from 'styles/theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme } from '@mui/material/styles';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

library.add(fab);

function App({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // page loading
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  const theme = useSelector((state) => state.theme.value);

  const Theme = theme === 'light' ? createTheme(lightTheme) : createTheme(darkTheme);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
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
