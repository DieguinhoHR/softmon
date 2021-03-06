import React, { useState, useEffect } from 'react'

import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

import * as compose from 'lodash.flowright'
import { Link } from 'react-router-dom'

const imgFluid = {
  maxWidth: "40%", 
  height: "auto",
  overflowY: "auto"
}

function Pokemon(props) {
  const [pokemons, setPokemons] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    if (props.allPokemons.pokemons !== undefined) {
      setPokemons(props.allPokemons.pokemons)
    }
  }, [props]);

  const handleBackPage = () => {
    setName('')
  }

  return (
    <>           
      <div className="card-body">
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Digite o nome do pokémon" 
            aria-label="Digite o nome do pokémon" 
            aria-describedby="basic-addon2"
            value={name}
            onChange={(e) => {
              setName(e.target.value)              
            }}
          />         
        </div>

        <Query
          query={GET_POKEMON}
          variables={{ name }}          
          pollInterval={1000}
        >          
          {({ loading, error, data }) => {     
            if (loading) return <p>Loading...</p>;        
            if (error) return '';

            return (
              <div className="col-sm-12">
                <div className="card">
                <img 
                  src={data.pokemon ? data.pokemon.image : ''} 
                  className="card-img-top rounded mx-auto d-block" 
                  style={imgFluid} 
                  alt={data.pokemon ? data.pokemon.name : ''}
                />
                  <div className="card-body">
                    <h5 className="card-title">
                      <span className="badge badge-info">
                        {data.pokemon ? `${data.pokemon.number}-${data.pokemon.name}` : ''}
                      </span>                   
                    </h5>
                    
                    <h5 className="card-title">                      
                      {data.pokemon && data.pokemon.attacks.special.map((attack, index) => (  
                        <span className="badge badge-danger mr-1" key={index}>{attack.name} - {attack.type}</span>
                      ))}
                    </h5>

                    { !data.pokemon && 
                      <div className="alert alert-primary" role="alert">
                        Nenhum registro encontrado
                      </div>
                    }
                    <Link to='/' className="btn btn-outline-primary btn-sm mr-1" onClick={handleBackPage}>Voltar</Link>    
                  </div>
                </div>
            </div>
            );
          }}    
        </Query>   

        <div className="row">          
          { !name && pokemons.map((pokemon, index) => (
              <div className="col-sm-6" key={pokemon.id}>
                <div className="card">
                <img 
                  src={pokemon.image} 
                  className="card-img-top rounded mx-auto d-block" 
                  style={imgFluid} 
                  alt={pokemon.name}
                />
                  <div className="card-body">
                    <h5 className="card-title">
                      <span className="badge badge-info">{pokemon.number} - {pokemon.name}</span>                   
                    </h5>
                    
                    <h5 className="card-title" key={index}>
                      { pokemon.attacks.special.map((attack, index) => (  
                        <span className="badge badge-danger mr-1" key={index}>{attack.name} - {attack.type}</span>
                      ))}
                    </h5>

                    <Link to={`/pokemon/${pokemon.id}`} className="btn btn-outline-primary btn-sm mr-1">Visualizar</Link>
                    <Link to={`/pokemon/${pokemon.id}/edit`} className="btn btn-outline-primary btn-sm">Editar</Link>         
                  </div>
                </div>
              </div>
            ))}
        </div>                
      </div>      
    </>
  );
}

const GET_POKEMONS = gql`
  query {
    pokemons(first: 500) {
      id
      name
      image
      number
      attacks {
        special {
          name
          type
        }
      }       
    }
  }
`

const GET_POKEMON = gql`
  query($name: String) {
    pokemon(name: $name) {
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
  graphql(GET_POKEMONS, { name: 'allPokemons' }),
  graphql(GET_POKEMON, { name: 'getPokemon' })
)(Pokemon);