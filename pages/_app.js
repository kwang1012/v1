import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider, useSelector } from 'react-redux';
import { wrapper, store, persistor } from 'src/store';
import { darkTheme, lightTheme } from 'styles/theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Head } from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';

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

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(App);