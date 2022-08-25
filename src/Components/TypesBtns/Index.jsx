import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import '../PokeCard/index.css'


function TypesBtns({typesOfPokemons}) {

  const [pokeTypes, setPokeTypes ] = useState([]);

  setPokeTypes(typesOfPokemons);
  console.log(pokeTypes)
  return (
    <ButtonGroup  aria-label="Basic example">
      {<Button variant="secondary">Fire</Button>}
    </ButtonGroup>
  )
}

export default TypesBtns;