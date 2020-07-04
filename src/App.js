import React from 'react';
import { ApolloProvider } from 'react-apollo'

import apolloClient from './services/apollo'

//import * as compose from 'lodash.flowright'
import TodoList from './pages/TodoList'

function App() {
  return (    
    <ApolloProvider client={apolloClient}>
      <main>
        <TodoList />
      </main>
    </ApolloProvider>
  );
}

export default App