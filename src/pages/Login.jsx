import React from 'react'
import { useState } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setLoading] = useState(false);

  

  const [validated, setValidated] = useState(false);

  //state to hold form data

  const [formData , setFormData] = useState({

    email: "",
    password: "",
  });


  //function to handle change in form fields

  const handleChange=(event)=>{

    const{name, value}=event.target;

    //update form data state with new values 

    setFormData((prev)=>({

        ...prev,
        [name]: value,
    })
  )
  }

  //function to handle form submission 
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      
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
        <Form.Control type="email"
        value={formData.email}
        onChange={handleChange}
        name = "email"
         placeholder="Enter email"
         required
         />
        <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3 position-relative " controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        name = "password"
        placeholder="Password" 
        required
        />
        
        <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
    
        <span className=' position-absolute top-50 end-0  me-2 ' onClick={()=>
          setShowPassword(!showPassword)
        }>

          {showPassword ? "hide" : "show"}
        </span>
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