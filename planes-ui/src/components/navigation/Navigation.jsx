// Creates navigation bar
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import navigationStyle from "./navigation.module.css";

function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      className="p-2"
      expand="sm"
      id={navigationStyle.navColor}
    >
      <NavbarBrand>Username</NavbarBrand>
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      ></Navbar.Toggle>
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <Nav.Link href="/reservations">Reserve a Plane</Nav.Link>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
