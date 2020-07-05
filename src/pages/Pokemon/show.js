import React from 'react'

import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

import * as compose from 'lodash.flowright'
import { Link } from 'react-router-dom'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'

const imgFluid = {
  maxWidth: "40%", 
  height: "auto",
  overflowY: "auto"
}

function Pokemon(props) {
  let object = props.match.params;

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
              <div className="col-sm-12" key={data.pokemon.id}>
                <div className="card">
                <img 
                  src={data.pokemon.image} 
                  className="card-img-top rounded mx-auto d-block" 
                  style={imgFluid} 
                  alt={data.pokemon.name}
                />
                  <div className="card-body">
                    <h5 className="card-title">
                      <span className="badge badge-info">{data.pokemon.number} - {data.pokemon.name}</span>                   
                    </h5>
                    
                    <h5 className="card-title">
                      { data.pokemon.attacks.special.map((attack, index) => (  
                        <span className="badge badge-danger mr-1" key={index}>{attack.name} - {attack.type}</span>
                      ))}
                    </h5>

                    <Link to='/'>                         
                      <a href="#" className="btn btn-primary">Voltar</a>
                    </Link>            
                  </div>
                </div>
            </div>
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
)(Pokemon);