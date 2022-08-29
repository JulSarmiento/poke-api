import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import capitalizeFirstLetter from '../Utilities/Capitalize';

import './index.css'
import '../PokeCard/index.css'


function stringFix( string) { 
  return decodeURIComponent(string)
}

function weightConvert(number) {
  return number * (1.0 / 10.0)
}

function heighttConvert(number) {
  return (number * (0.1 / 1.0)).toFixed(1)
}



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
  }, [pokemon.types])

  useEffect(() => {

    const getDescription = async () => {
      const res = await fetch(pokemon.species.url);
      const json = await res.json();      
      return json
    }

    getDescription().then((detail) => {
      const [{flavor_text: description}] = detail.flavor_text_entries;
      setPokeDescription(description.replace(/(\r\n|\||\f|\r)/gm, " "));
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
          <span className='poke-number'>No.{pokemon.id}</span>  {capitalizeFirstLetter(pokemon.name)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body poke-body">

        <div className='poke-info'>
          <img src={pokePicture} alt="pokemon" className='poke-img'/>
          <div className='poke-stats'>

            <ul>
              <li className='stat-info'><span>Weight:</span> <p>{weightConvert(pokemon.weight)} kg</p></li>
              <li className='stat-info'><span>Height:</span> <p>{heighttConvert(pokemon.height)} m</p></li>
              <li className='stat-info'>
                <span>Abilities:</span>
                <ul className='abiilities'>
                {pokemon.abilities.map(ability => <li key={Math.random()}>{capitalizeFirstLetter(ability.ability.name)}</li>)}
                </ul>
              </li>
              <li className='stat-info'>
                <span>Decription:</span>
                <p className='description'>
                  {stringFix(capitalizeFirstLetter(pokeDescription))}
                </p>
              </li>
            </ul>

          </div>
        </div>
        

        
        <div className='types-container'>

          <div>
            <p className='type-title'>Strong against: </p>
            <div className='element-types-container'>
              {pokemon.types.map(({type: {name}, slot}) => {
                return <span className={`slot-${name} types`} key={slot}>{capitalizeFirstLetter(name)}</span>
              })}
            </div>
          </div>

          <div>
            <p className='type-title'>Weak against: </p>
            <div className='element-types-container'>
              {!pokeweaks ? " " : pokeweaks.map(item =>  <span  key={pokeweaks} className={`slot-${item} types`} >{capitalizeFirstLetter(item)}</span>)} 
            </div>                                      
          </div>    

        </div>
              


      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-general' onClick={options.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default PokeModal;