import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import * as compose from 'lodash.flowright'

class TodoList extends Component {
  state = {
    newTodoText: '',
  }

  renderTodoList = () => (
    <ul>        
        {console.log(this.props.pokemons.pokemon.id)}
      {/* { this.props.pokemons.pokemon.map(pokemon =>
        <li key={pokemon.id}>xx</li>
      )} */}
    </ul>
  )

  render() {
    const { pokemons } = this.props;

    return (
      <>
        { pokemons.loading
          ? <p>Carregando...</p>
          : this.renderTodoList() }
      </>
    );
  }
}

const GET_POKEMONS = gql`
    query {
        pokemon(name: "Pikachu") {
            id
            number
            name
            attacks {
                special {
                    name
                    type
                    damage
                }
            }
            evolutions {
                id
                number
                name
                weight {
                    minimum
                    maximum
                }
                attacks {
                    fast {
                        name
                        type
                        damage
                    }
                }
            }
        }   
    }
`;

export default compose(
  graphql(GET_POKEMONS, { name: 'pokemons' }),
)(TodoList);