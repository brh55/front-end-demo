import App from './App.tsx';
import '@mantine/core/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { createTheme, MantineProvider } from '@mantine/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const theme = createTheme({});

const client = new ApolloClient({
  uri: 'https://summit-router-final-j3nprurqka-ue.a.run.app/',
  cache: new InMemoryCache(),
  connectToDevTools: true,
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
