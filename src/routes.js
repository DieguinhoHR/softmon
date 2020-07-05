import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import IndexPokemon from './pages/Pokemon/index'
import ShowPokemon from './pages/Pokemon/show'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={IndexPokemon} path="/" exact />
      <Route component={ShowPokemon} path="/pokemon/:id" />
    </BrowserRouter>
  )
}

export default Routes;