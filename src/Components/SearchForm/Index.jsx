import React from "react"

export default function SearchForm() {

  return (

    <form>
      <div>
        <label htmlFor="pokemon-to-search">Buscar bichitos</label>
        <input type="text" name="pokemon-to-search"/>
      </div>
    </form>
  )
}