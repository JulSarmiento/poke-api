import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SearchForm() {

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Buscar Pokemon</Form.Label>
        <Form.Control type="password" placeholder="Nombre del Pokemon" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}