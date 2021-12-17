import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {} from "react-router-dom";
// import { logout } from "../actions/userActions";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">URL Shortner</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                //   onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href="#">My URLs</Nav.Link>
            <NavDropdown title="Vandana Nandan">
              <NavDropdown.Item href="#">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
