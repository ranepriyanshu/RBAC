import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';



function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">PR's Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="ms-2 nav-link" to ="dashboard" >Home</NavLink>
            <NavLink className="ms-2 nav-link" to="admin">AdminPanel</NavLink>
            <NavLink className="ms-2 nav-link" to="user">Users</NavLink>
            <NavLink className="ms-2 nav-link" to="user-info">User Info</NavLink>
           
          <Button varient = "primary" className='ms-3'>
            <NavLink className="text-white" to='/'>Login</NavLink>
          </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

