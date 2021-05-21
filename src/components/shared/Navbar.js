import React from 'react';
import { Nav, Navbar } from "react-bootstrap";

const NavbarComponent = (props) => {
  const {decodedToken} = props;
  const admin = decodedToken['is_admin'] === true;

  const logout = () => {
    localStorage.removeItem('token');
    // props.history.push('/');
  }
  
    return (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Welcome {decodedToken ? decodedToken['name'] : ""}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {admin && <Nav.Link href="/">View Agencies</Nav.Link>}
              {admin && <Nav.Link href="/admin/home/agency/new">Add Agency</Nav.Link>}
              {admin && <Nav.Link href="/admin/home/view/customers">View Customers</Nav.Link>}
              {admin && <Nav.Link href="/admin/home/view/deliveries">View Deliveries</Nav.Link>}
              {admin && <Nav.Link href="/admin/home/view/workers">View Workers</Nav.Link>}
              {!admin && <Nav.Link href="/agency/home/view/workers">View Workers</Nav.Link>}
              {!admin && <Nav.Link href="/agency/home/worker/new">Add Worker</Nav.Link>}
              {!admin && <Nav.Link href="/agency/home/view/customers">View Customers</Nav.Link>}
              {!admin && <Nav.Link href="/agency/home/view/deliveries">View Deliveries</Nav.Link>}
            </Nav>
            <Nav>
              <Nav.Link onClick={(e) => null}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
};

export default NavbarComponent;