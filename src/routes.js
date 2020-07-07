import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import IndexPokemon from './pages/Pokemon/index'
import ShowPokemon from './pages/Pokemon/show'
import EditPokemon from './pages/Pokemon/edit'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={IndexPokemon} path="/" exact />
      <Route component={EditPokemon} path="/pokemon/:id/edit" exact />
      <Route component={ShowPokemon} path="/pokemon/:id" exact />      
    </BrowserRouter>
  )
}

export default Routes;