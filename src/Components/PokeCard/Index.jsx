
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

import './index.css'
import PokeModal from "../Modal/Index";
import capitalizeFirstLetter from "../Utilities/Capitalize";

  
/**
 * @see https://github.com/PokeAPI/sprites
 */
function PokeCard({ pokemon: {url, name}, type }) {

  const [modalShow, setModalShow] = useState(false);
  const [info, setInfo] = useState();

  const onError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
  }

  useEffect( () => {
    const fetchPokemon = async () => {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    };

    fetchPokemon().then((json) => {
      setInfo(json)
    })
  }, [url]);

 
  if(!info) { 
    return <img src="https://cdn.dribbble.com/users/946764/screenshots/2844436/pokeball.gif" alt="loading"/>
  }

  const img = url
    .slice(0, -1)
    .replace(
      "https://pokeapi.co/api/v2/pokemon/",
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${type}/`
    ) + ".png";
      
  return (
    <div>
      <Card className="card-card-container" style={{ width: '18rem', textAlign: 'center' }} >
        <Badge className="poke-number" bg="none">{info.id}</Badge>
        <Card.Img variant="top" height="300px" src={img} onError={onError}/>
        <Card.Body className="card-body">
          <Card.Title className="poke-name">{capitalizeFirstLetter(name)}</Card.Title>
          <Card.Text className="types-container">
            {info.types.map(({type: {name}, slot}) => {
              return <span className={`slot-${name} types`} key={slot}>{capitalizeFirstLetter(name)}</span>
            })}
          </Card.Text>     

          <Button className="btn-card btn-general" variant="none" onClick={() => setModalShow(true)}>See more</Button>
          <PokeModal
            
            pokemon={info}
            pokePicture={img}
            options={{
              show: modalShow,
              onHide : () => setModalShow(false),
              

            }}
          />
        </Card.Body>
      </Card>




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
