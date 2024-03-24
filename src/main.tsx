import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { createTheme, MantineProvider } from '@mantine/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App.tsx';
import '@mantine/core/styles.css';

const theme = createTheme({});

const client = new ApolloClient({
  uri: 'https://ecom-demo-router-z7dpe2fvra-ue.a.run.app/',
  cache: new InMemoryCache(),
});

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
