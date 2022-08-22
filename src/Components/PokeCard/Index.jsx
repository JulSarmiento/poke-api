import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './index.css'

  
/**
 * @see https://github.com/PokeAPI/sprites
 */
function PokeCard({ pokemon, type }) {

  const [info, setInfo] = useState();

  const capitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  };

  useEffect( () => {
    const fetchPokemon = async () => {
      const res = await fetch(pokemon.url);
      const json = await res.json();
      return json;
    };

    fetchPokemon().then((json) => {
      setInfo(json)
    })
  }, [pokemon]);

  if(!info) {
    return <img src="https://cdn.dribbble.com/users/946764/screenshots/2844436/pokeball.gif" alt="loading"/>
  }

  const img = pokemon.url
    .slice(0, -1)
    .replace(
      "https://pokeapi.co/api/v2/pokemon/",
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${type}/`
    ) + ".png";
      
  return (
    <Card style={{ width: '18rem', textAlign: 'center' }} >
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Text>
          {info.types.map(({type: {name}, slot}) => {
            return <span className={`slot-${name}`} key={slot}>{name}</span>
          })}
        </Card.Text>
        <Card.Title>{capitalizeFirstLetter(pokemon.name)}</Card.Title>
        <Button href={pokemon.url} variant="primary">Detalles</Button>
      </Card.Body>
    </Card>

  );
}

PokeCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  type: PropTypes.oneOf(["official-artwork", "home", "red-blue", "crystal", "gold", "silver"])
};

PokeCard.defaultProps = {
  type: "official-artwork",
};

export default PokeCard;
