// Creates navigation bar
import { Nav, Navbar } from "react-bootstrap";
import navigationStyle from "./navigation.module.css";
import { useLocation } from "react-router-dom";

// Get the cookie given the name. In our example, just look for the start 'userName='
const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      const value = cookie.substring(name.length);
      return value;
    }
  }

  return null; // Cookie not found
};

// Extract the information from the userCookie into their own constants
const extractUserInfo = () => {
  const userCookie = getCookie("userName=");

  const userInfo = {};

  // Extract email address
  const emailMatch = userCookie?.match(/([^&]+)/);
  userInfo.email = emailMatch ? emailMatch[1] : null;

  // Extract userType
  const userTypeMatch = userCookie?.match(/&userType=([^&]+)/);
  userInfo.userType = userTypeMatch ? userTypeMatch[1] : null;

  // Extract userId
  const userIdMatch = userCookie?.match(/&userId=([^&]+)/);
  userInfo.userId = userIdMatch ? userIdMatch[1] : null;

  return userInfo;
};

function Navigation() {
  // Extract the cookie info
  const userInfo = extractUserInfo();
  const location = useLocation();

  // Get current navigation path
  const path = location.pathname;

  // Save the id from the extracted cookie
  const userName = userInfo.email;

  return (
    <Navbar
      collapseOnSelect
      className="p-2"
      expand="sm"
      id={navigationStyle.navBar}
    >
      <Navbar.Brand>
        <img
          src="favicon.ico" // Replace with the actual path to the image
          alt="User Profile"
          className={navigationStyle.profileImage}
        />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      ></Navbar.Toggle>
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <Nav.Link
            href="/reservations"
            className={path === "/reservations" && navigationStyle.active}
          >
            Reserve a Plane
          </Nav.Link>
          <Nav.Link
            href="/schedule"
            className={path === "/schedule" && navigationStyle.active}
          >
            Schedule
          </Nav.Link>
          <Nav.Link
            href="/about"
            className={path === "/about" && navigationStyle.active}
          >
            About
          </Nav.Link>
          <Nav.Link
            href="/contact"
            className={path === "/contact" && navigationStyle.active}
          >
            Contact
          </Nav.Link>
          <Nav.Link
            href="/user_profile"
            className={path === "/user_profile" && navigationStyle.active}
          >
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
