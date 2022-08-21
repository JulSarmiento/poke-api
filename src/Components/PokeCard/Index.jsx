import React from "react";
import PropTypes from "prop-types";

/**
 * @see https://github.com/PokeAPI/sprites
 */
function PokeCard({ pokemon, type }) {
  const img = pokemon.url
    .slice(0, -1)
    .replace(
      "https://pokeapi.co/api/v2/pokemon/",
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${type}/`
    ) + ".png";
      
  return (
    <div>
      <p>{pokemon.name}</p>
      <img src={img} alt="foto del bichito" />
      <a href={pokemon.url}>Detalles</a>
    </div>
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
