import React, {useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './index.css'

const URL = "https://pokeapi.co/api/v2/pokemon/"

export default function SearchForm({name}) {

  const [pokemon, setPokemon] = useState();

  const handlerOnChange = (e) => {
    setPokemon(e.target.value)
  }

  const fetchPokemon = async (name) => {
    const res = await fetch(`${URL}${name}/`);
    const json = await res.json();
    return json
  };

  console.log(pokemon)

  const submit = (e) => {      
    e.preventDefault();
    fetchPokemon(pokemon)
   }

   return (
    <Form className="form-container" onSubmit={submit}>

      <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Label></Form.Label>
        <Form.Control type="text" name="pokemon-to-search" onChange={handlerOnChange} placeholder="Nombre del Pokemon" />
      </Form.Group>
      <Button variant="primary" className="btn-form" type="submit">
        Buscar
      </Button>
    </Form>
  )
}

  

  



  


