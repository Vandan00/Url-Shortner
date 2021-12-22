// import axios from "axios";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import {} from "react-router-dom";
// import { logout } from "../actions/userActions";

const Header = () => {
  //   const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  // const unstable_HistoryRouter = unstable_HistoryRouter();
  const handleLogout = async () => {
    // dispatch(logout());
    try {
      //   await axios.get("/users/logout");
      localStorage.removeItem("userInfo");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Link to="/">URL Shortner</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/myurls">
              <Link to="/myurls">My URLs</Link>
            </Nav.Link>
            <NavDropdown title="test">
              <NavDropdown.Item href="#">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/" onClick={handleLogout}>
                  {" "}
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
