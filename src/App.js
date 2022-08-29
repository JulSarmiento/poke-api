import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import logo from './Assets/imgs/logo.png'
import './Components/PokeCard/index.css'
import './App.css';
import PokeCard from './Components/PokeCard/Index';


// Logica del fetch

// url base
const URL = 'https://pokeapi.co/api/v2';

function App() {
  const [isLoading, setIsloading] = useState(false);
  const [pagination, setPagination] = useState({});

  const [pokemons, setPokemons] = useState([]);

  const [types, setTypes] = useState([]);

  const listPokemons = async (url = `${URL}/pokemon?limit=20&offset=0`) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

  const listTypes = async (url = `${URL}/type`) => {
    const res = await fetch(url);
    const json = await res.json()
    return json
  }

  // Pendiente conseguir la lista de los pokemons en este url
  const pokemonFilter = async (name) => {
    const res = await fetch(`${URL}/type/${name}`);
    const {pokemon} = await res.json()
    if(pokemon) {
      const filtered = pokemon.map((item) => item.pokemon);
      setPokemons(filtered);
      setPagination({})

    }
  }

  // pendeinte investigar useCallback
  const fetchPokemons = useCallback((url) => {
    setIsloading(true);
    setTimeout(() => {
      listPokemons(url).then(({count, next, previous, results}) => {
        setPokemons(results);
        setPagination({next, previous, count});
        setIsloading(false);
      });
    }, 1000);
  }, []);


  // Fetch all pokemons with offset limit
  useEffect( () =>{
    fetchPokemons();
  }, [fetchPokemons]);


  // List all the types
  useEffect(() => {
    listTypes().then(({results}) => {
      setTypes(results);
    });
  }, []);

  if (isLoading) {
    return <div className='loading'><img  src="https://cdn.dribbble.com/users/946764/screenshots/2844436/pokeball.gif" alt="loading"/></div>
  }
  
  return (
    <div className="App">

      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#"><img src={logo} className="logo" alt="logo de StudyCorn Dev"/></Navbar.Brand>
        </Container>
      </Navbar>

      <div className='main'>

        <div className="pokemon-types">
          <ButtonGroup  aria-label="Basic example" className="types-container">
            {types.map(({name}) => <Button key={name} className={`btn-styles slot-${name} `} onClick={() => pokemonFilter(name)} >{name}</Button> ) }
          </ButtonGroup>
        </div>

        <h1 className='title'>PokeApi by: <span>StudCorn Dev</span></h1>

        <div className="card-container">
          {pokemons.map((pokemon) => <PokeCard key={pokemon.url} pokemon={pokemon}/>)}
        </div>


        <div className="btn-container">
          <button className="btn-general btn-home" disabled={!pagination.previous} onClick={() => fetchPokemons(pagination.previous)}>Anterior</button>
          <button className="btn-general btn-home" disabled={!pagination.next} onClick={() => fetchPokemons(pagination.next)}>Siguiente</button>
        </div>
      </div>


      <footer className='footer'>
        <ul>
          <li>
            <a href="https://instagram.com/studycorndev?igshid=YmMyMTA2M2Y=">instagram</a>
          </li>
          <li>
            <a href="https://github.com/JulSarmiento">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/julieth-sarmiento/">LinkedIn</a>
          </li>
        </ul>
      </footer>
      
    </div>
  );
}

export default App;
