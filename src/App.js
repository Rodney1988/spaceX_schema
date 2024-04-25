import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';

export const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <NavBar />
      <HomePage />
    </ApolloProvider>
  );
}

export default App;
