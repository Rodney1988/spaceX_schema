import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { Histories } from './components/Histories';

export const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/histories" element={<Histories />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
