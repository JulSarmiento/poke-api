import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import PokeCard from './Components/PokeCard/Index';
import SearchForm from './Components/SearchForm/Index';

// Logica del fetch

//https://pokeapi.co/api/v2/pokemon?limit=20&offset=0

// url base
const URL = 'https://pokeapi.co/api/v2';

function App() {
  const [isLoading, setIsloading] = useState(false);
  const [pagination, setPagination] = useState({});

  const [pokemons, setPokemons] = useState([]);

  const listPokemons = async (url = `${URL}/pokemon?limit=20&offset=0`) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  };

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

  useEffect( () =>{
    fetchPokemons();
  }, [fetchPokemons]);

  if (isLoading) {
    return <img src="https://cdn.dribbble.com/users/946764/screenshots/2844436/pokeball.gif" alt="loading"/>
  }
  
  return (
    <div className="App">
      Pagina Principal

      <SearchForm/>

      <button disabled={!pagination.previous} onClick={() => fetchPokemons(pagination.previous)}>Anterior</button>
      <button disabled={!pagination.next} onClick={() => fetchPokemons(pagination.next)}>Siguiente</button>

      {pokemons.map((pokemon) => <PokeCard key={pokemon.url} pokemon={pokemon}/>)}
    </div>
  );
}

export default App;
