import React from 'react'
import { useState } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

const Login = () => {
  const [validated, setValidated] = useState(false);

  //function to handle form submission 
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="login-section align-content-center ">
      <Container>
        <Row className='justify-content-center'>
          <Col xl={4} lg={5} md={7} xs={12}>
          <div className="login-box  rounded p-4 shadow-sm bg-light">
            <h3 className='md-4'>Sign In</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

          </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login