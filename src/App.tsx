import './App.css'
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Demo from './Demo';

const theme = createTheme({});

const client = new ApolloClient({
  uri: 'https://ecom-demo-router-z7dpe2fvra-ue.a.run.app/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <ApolloProvider client={client}>
          <Demo />
        </ApolloProvider>
      </MantineProvider>
    </>
  )
}

export default App
