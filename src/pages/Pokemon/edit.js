import React, { useState } from 'react'

import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

import * as compose from 'lodash.flowright'
import { Link } from 'react-router-dom'

function Edit(props) {
  const [name, setName] = useState('')

  let object = props.match.params;  

  const handleInputChange = e => {    
    setName(e.target.value);
  }

  function handleUpdate() {
    localStorage.setItem('pokemon', JSON.stringify(name));
    alert('Registro atualizado com sucesso')
  }


  return (
    <>
        <Query
          query={GET_POKEMON}
          variables={{ id: object.id }}   
          pollInterval={1000}
        >          
          {({ loading, error, data }) => {                     
            if (loading) return <p>Loading...</p>;        
            if (error) return `Error! ${error}`;

            return (
              <form>
                <div className="container">
                  <div className="row">
                    <div className="col-12 mt-4">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon3">Nome pokémon</span>
                        </div>
                        <input 
                          name="name"
                          type="text" 
                          className="form-control" 
                          placeholder="Digite o nome do pokémon" 
                          aria-label="Digite o nome do pokémon" 
                          aria-describedby="basic-addon2"
                          value={name || data.pokemon.name}                   
                          onChange={handleInputChange}
                        />   
                      </div>  
                    </div>

                    <div className="col mb-2">
                      <Link to='/' className="btn btn-outline-primary btn-sm mr-1">Voltar</Link>    
                      <button className="btn btn-outline-primary btn-sm mr-1" onClick={handleUpdate}>Atualizar</button>
                    </div> 
                  </div>
                </div>
              </form>
            );
          }}    
        </Query>         
    </>
  );
}

const GET_POKEMON = gql`
  query($id: String!) {
    pokemon(id: $id) {
      id
      number
      name
      image
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
`

export default compose(  
  graphql(GET_POKEMON, { name: 'getPokemon' })
)(Edit);