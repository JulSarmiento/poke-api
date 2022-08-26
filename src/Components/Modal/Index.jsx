import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import capitalizeFirstLetter from '../Utilities/Capitalize';


import '../PokeCard/index.css'


function PokeModal({ options, pokemon, pokePicture }) {

  const [pokeDescription, setPokeDescription] = useState("");
  const [pokeweaks, setPokeWeaks] = useState("")


  useEffect(() => {
    const getWeaksness = async (name) => {

      const res = await fetch(`https://pokeapi.co/api/v2/type/${name}/`);
      const json = await res.json();
      console.log("json del fetch", json.damage_relations.double_damage_from)
      return json.damage_relations.double_damage_from
    };

    //devuelve un array de promesas
    Promise.all(pokemon.types.map(({type}) => getWeaksness(type.name))).then(values => {
      const weaks = values.reduce( (a, b) => a.concat(b), []).map(({name}) => name);

      const uniques = new Set(weaks);
      setPokeWeaks([...uniques]);
    })
    // pokemon.types.forEach(({type: {name}, slot}) => {
    //   getWeaksness(name).then(setPokeWeaks())
    // });
  }, [pokemon.types])

  useEffect(() => {

    const getDescription = async () => {
      const res = await fetch(pokemon.species.url);
      const json = await res.json();      
      return json
    }

    getDescription().then((detail) => {
      const [{flavor_text: description}] = detail.flavor_text_entries;
      setPokeDescription(description);
    })
  }, [pokemon.species.url])

    // 
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...options}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>No.{pokemon.id}</span>  {capitalizeFirstLetter(pokemon.name)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <img height="300px" src={pokePicture} alt="pokemon" />
        <div>
          <div>
            <p>Tipo</p>
            {pokemon.types.map(({type: {name}, slot}) => {
              return <span className={`slot-${name} types`} key={slot}>{capitalizeFirstLetter(name)}</span>
            })}

            <p>Debilidad</p>
            <pre>{JSON.stringify(pokeweaks, undefined, 2)}</pre>
          </div>
          <div>
            <ul>
              <li><span>Peso:</span> {pokemon.weight}</li>
              <li><span>Altura:</span> {pokemon.height}</li>
              <li><span>Habilidades:</span>
                <ul>
                {pokemon.abilities.map(ability => <li key={Math.random()}>{ability.ability.name}</li>)}
                </ul>
              </li>
            </ul>
          </div>
          <p>
            {capitalizeFirstLetter(pokeDescription.toLocaleLowerCase())}
          </p>

        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={options.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default PokeModal;