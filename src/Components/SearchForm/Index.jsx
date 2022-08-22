import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './index.css'

export default function SearchForm() {

  return (
    <Form className="form-container">
      <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Label></Form.Label>
        <Form.Control type="password" placeholder="Nombre del Pokemon" />
      </Form.Group>
      <Button variant="primary" className="btn-form" type="submit">
        Submit
      </Button>
    </Form>
  )
}