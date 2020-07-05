import React from 'react'

import { ApolloProvider } from 'react-apollo'
import apolloClient from './services/apollo'

import { Main } from './styles'

import Routes from './routes';

function App() {
  return (    
    <ApolloProvider client={apolloClient}>
      <Main>
        <div className='container'>
          <div className="card">
            <h5 className="card-header">Pokémons</h5>
            <Routes />
          </div>
        </div>
      </Main>
    </ApolloProvider>
  );
}

export default App