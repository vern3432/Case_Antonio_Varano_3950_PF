//test
import "../about/about_style.css";
import GoogleMapReact, { Marker } from "google-map-react";
import modalfor from "./modalfor";
import { useState, useEffect, useRef } from "react";
import "./profile.css";

const tabHeights = {
  1: 600,
  2: 800,
  3: 1100,
  4: 1050,
};
var [mainHeight, setMainHeight] = [10, 10];
function onselection(input) {
  mainHeight = input;
}

function UserProfile1() {
  const [id, setId] = useState("");
  const [emailpost, setEmailpost] = useState("");
  const [Accountype, setAccountype] = useState("");


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
  const extractUserInfo = (userCookie) => {
    const userInfo = {};

    // Extract email address
    const emailMatch = userCookie.match(/([^&]+)/);
    userInfo.email = emailMatch ? emailMatch[1] : null;

    // Extract userType
    const userTypeMatch = userCookie.match(/&userType=([^&]+)/);
    userInfo.userType = userTypeMatch ? userTypeMatch[1] : null;

    // Extract userId
    const userIdMatch = userCookie.match(/&userId=([^&]+)/);
    userInfo.userId = userIdMatch ? parseInt(userIdMatch[1], 10) : null;

    return userInfo;
  };

  useEffect(() => {
    const userCookie = getCookie("userName=");

    if (userCookie) {
      // Extract the cookie info
      const userInfo = extractUserInfo(userCookie);
      setId(userInfo.userId);
      setEmailpost(userInfo.email);
      setAccountype(userInfo.userType);

    }

    fetchData(id); // Initial fetch

    // Set up interval for polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchData(id);
    }, 5000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

    // Dependency array ensures that the effect runs only when 'id' changes
  }, [id]);


  const [rerender, setRerender] = useState(false);
  const selectedTabRef = useRef(1);

  const latitude = 42.6685;
  const longitude = 71.1227;

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Hello World!",
    });
    return marker;
  };

  let selectedTab = 1;

  const handleTabChange = (tabNumber) => {
    fetchData(id);
    selectedTabRef.current = tabNumber;
    selectedTab = tabNumber;
    onselection(tabNumber * 100);
    updateTabVisibility();
    triggerRerender();
  };
  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };
  const getMainHeight = () => {
    return tabHeights[selectedTabRef.current];
  };

  const updateTabVisibility = () => {
    for (let i = 1; i <= 4; i++) {
      const contentSection = document.getElementById(`content${i}`);
      if (contentSection) {
        contentSection.style.display =
          selectedTabRef.current === i ? "block" : "none";
      }
    }
  };
  const [reservers, setreservers] = useState("");

  function fetchData(id) {


    console.log(id);

    fetch('http://localhost:3001/fetch-user-reserver', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setreservers(data.map((row) => (
            <div key={row.comment_id} className="personal-reservation-card">
              <p>Flight Type: {row.flighttype}</p>
              <p>From Date: {row.fromDate}</p>
              <p>To Date: {row.toDate}</p>
              <p>From Time: {row.fromTime}</p>
              <p>From Time: {row.toTime}</p>

            </div>
          )));
        } else {
          setreservers('No reservations found.');
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      });
  }

  return (
    <main style={{ height: `${getMainHeight()}px`, transition: "height 0.5s" }}>
      {" "}
      <h1>My Profile</h1>
      <input
        id="radio1"
        type="radio"
        name="css-tabs"
        value="1"
        defaultChecked // Set the first option as default
        oncheck={onselection(100)}
        onChange={() => handleTabChange(1)}
      ></input>
      <input
        id="radio2"
        type="radio"
        name="css-tabs"
        value="2"
        onChange={() => handleTabChange(2)}
        onchecked={onselection(200)}
      ></input>
      <div id="tabs">
        <label id="tab5" htmlFor="radio1">
          Profile Info{" "}
        </label>
        <label id="tab6" htmlFor="radio2">
          Reservations
        </label>
      </div>
      <div id="content">
        <section id="content1">
          {/* <h3>Information Comapny and Origin</h3> */}
          <h1 id="about_text">Account Info</h1>
          <p id="about_text">
            <b>Account Email: {emailpost}</b>
            <br />
            <b>Account ID:  {(id)}</b>
            <br />
            <b>Account Type:{Accountype}</b>
          </p>
        </section>
        <section id="content2">
          {reservers}
        </section>
      </div>
    </main>
  );
}
export default UserProfile1;