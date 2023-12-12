// Creates navigation bar
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import navigationStyle from "./navigation.module.css";

const getCookie = (name) => {
  const cookieString = document.cookie;
  console.log("cookie string", cookieString);
  const cookies = cookieString.split('; ');
  console.log("cookies", cookies);
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    console.log("cookiedName", cookieName);
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null; // Cookie not found
};

// Example usage:
const userName = getCookie('userName');

if (userName) {
  console.log('User name retrieved:', userName);
} else {
  console.log('User name cookie not found');
}



function Navigation() {
  const userNameCookie = getCookie('userName');

  return (
    <Navbar
      collapseOnSelect
      className="p-2"
      expand="sm"
      id={navigationStyle.navColor}
    >
      <NavbarBrand>{userNameCookie || 'Default Username'}</NavbarBrand>
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
