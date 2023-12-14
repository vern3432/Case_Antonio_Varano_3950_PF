//test
import "../about/about_style.css";
import GoogleMapReact, { Marker } from "google-map-react";
import modalfor from "./modalfor";

import React, { useState, useRef } from "react";
const renderMarkers = (map, maps) => {
  let marker = new maps.Marker({
    position: { lat: 25.0391667, lng: 122.525 },
    map,
    title: "Hello World!",
  });
  return marker;
};
// import React, { useState } from "react";

function getDirections1(string) {
  console.log("opening direction");
  window.open(string, "_blank");
}
let markers = [
  {
    id: 1,
    latitude: 27.0391667,
    longitude: 122.525,
    shelter: "marker 1",
  },
  {
    id: 2,
    latitude: 24.0391667,
    longitude: 110.525,
    shelter: "marker 2",
  },
  {
    id: 3,
    latitude: 20.0391667,
    longitude: 100.525,
    shelter: "marker 3",
  },
];

const tabHeights = {
  1: 600,
  2: 800,
  3: 1100,
  4: 1050,
};
var [mainHeight, setMainHeight] = [10, 10];
function onselection(input) {
  mainHeight = input;
  console.log("ran:" + input);
}

function UserProfile1() {
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
    setreservers('Please make a Reservation to Populate this Space')

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
          console.log(data)
          console.log(typeof(data))
          console.log(Array.isArray(data))
          setreservers(reservers+ data.map(row => `<div>${row.reservation_id}</div>`).join(''))
          // data.forEach(row => {
          //   console.log('<div>'+row.flighttype+'</div>')
          //   setreservers(reservers+'<div>'+row.flighttype+'</div>')
            
          //   });

        
        
        })
         .catch((error) => console.log("Error fetching data: ", error));
     }

  // const fetchData = async () => {
  //   const id = 29; // Replace with the ID you want to search for

  //   try {
  //     const response = await fetch('http://localhost:3001/fetch-user-reserver', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();

  //     // Print the fetched rows to the console
  //     console.log('Fetched data:');
  //     data.data.forEach(row => {
  //       console.log(row);
  //     });

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };









  const defaultProps = {
    center: {
      lat: 42.680416,
      lng: -71.127548,
    },
    zoom: 11,
  };
  const [id, setId] = useState("");
  const [emailpost, setEmailpost] = useState("");
  const [Accountype, setAccountype] = useState("");
  // Not the correct endpoint to use...to retrieve email, please grab from the stored cookie 

  function get_USERprofile(email) {
  console.log(email);
   fetch("http://localhost:3001/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
       body: JSON.stringify({
         email: email,
       }),
     })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         setId(data.user_id);
         setEmailpost(data.email);
         setAccountype(data.user_type);   
        //  fetchData(data.user_id);
          fetchData('29')

           })
       .catch((error) => console.log("Error fetching data: ", error));
   }
     get_USERprofile(localStorage.getItem("curremail"));

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
            <b>Account Email ID: {emailpost}</b>
            <br/>
            <b>Account ID:  {(id)}</b>
            <br />
            <b>Account Email ID:{Accountype}</b>
          </p>
        </section>
        <section id="content2">
        { reservers }
        </section>
      </div>
    </main>
  );
}
export default UserProfile1;