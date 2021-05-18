import React from 'react';
import { Nav, Navbar } from "react-bootstrap";

const NavbarComponent = (props) => {
  const {decodedToken} = props;
  
    return (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Welcome {decodedToken ? decodedToken['name'] : ""}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">View Agencies</Nav.Link>
              <Nav.Link href="/admin/home/agency/new">Add Agency</Nav.Link>
              <Nav.Link href="/admin/home/view/customers">View Customers</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={(e) => null}>Sign Out</Nav.Link>
              {/* <Link to="/">Sign out</Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
};

export default NavbarComponent;