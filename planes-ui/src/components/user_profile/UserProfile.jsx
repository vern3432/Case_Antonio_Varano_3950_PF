//test
import "./about/about_style.css";
import GoogleMapReact, { Marker } from "google-map-react";

import React, { useState, useRef } from "react";
const AnyReactComponent = ({ text }) => (
  <div style={{ position: "absolute" }}>
    <img src={marker} alt="" />
  </div>
);

//Lot
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
  return (
    <main style={{ height: `${getMainHeight()}px`, transition: "height 0.5s" }}>
      {" "}
      <h1>About Us</h1>
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
      <input
        id="radio3"
        type="radio"
        name="css-tabs"
        value="3"
        onChange={() => handleTabChange(3)}
        onchecked={onselection(300)}
      ></input>
      <input
        id="radio4"
        type="radio"
        name="css-tabs"
        value="4"
        onchecked={onselection(1200)}
        onChange={() => handleTabChange(4)}
      ></input>
      <div id="tabs">
        <label id="tab1" htmlFor="radio1">
          Our Company{" "}
        </label>
        <label id="tab2" htmlFor="radio2">
          Services
        </label>
        <label id="tab3" htmlFor="radio3">
          Locations
        </label>
        <label id="tab4" htmlFor="radio4">
          Our Staff
        </label>
      </div>
      <div id="content">
        <section id="content1">
          {/* <h3>Information Comapny and Origin</h3> */}
          <h1 id="about_text">Who we are</h1>
          <p id="about_text">
            "Welcome to [Flight School Name], where dreams take flight and
            passion soars high. Nestled in the heart of [Location], we are a
            local flight school committed to cultivating a new generation of
            skilled aviators. With experienced instructors, state-of-the-art
            facilities, and a dedication to safety, we provide a nurturing
            environment for aspiring pilots to spread their wings and achieve
            their aviation goals."
          </p>
          <h1 id="about_text">Our Mission</h1>
          <p id="about_text">
            "At [Flight School Name], our mission is to inspire and empower
            individuals to embrace the skies. We strive to deliver exceptional
            flight training that not only instills technical expertise but also
            fosters a profound love for aviation. Through unwavering commitment
            to safety, innovation, and personalized guidance, we aim to propel
            our students toward successful careers in aviation while nurturing a
            lifelong passion for the boundless freedom of the skies."
          </p>
        </section>
        <section id="content2">
          <h2 id="about_text">Rentals</h2>
          <p id="about_text">
            Explore the joy of flying with our premier aircraft rental service
            at [Flight School Name]. Whether you're a seasoned pilot or
            embarking on your first solo adventure, our diverse fleet of
            well-maintained aircraft is at your fingertips. Experience the
            thrill of the open skies with our reliable rentals, backed by our
            commitment to safety and quality, ensuring every flight is a
            seamless and exhilarating journey
          </p>
          <h2 id="about_text">Lessons</h2>
          <p id="about_text">
            At [Flight School Name], our lessons are tailored to transform
            aspirations into aviator achievements. Led by seasoned instructors,
            our comprehensive flight lessons blend theory with hands-on
            experience, providing a dynamic and personalized learning
            environment. From the basics of takeoff to mastering intricate
            maneuvers, we guide aspiring pilots through every stage of their
            aviation journey, fostering confidence and competence in the
            exhilarating realm of flight.
          </p>
          <h2 id="about_text">Designated Pre-Chartered Flights</h2>
          <p id="about_text">
            Elevate your travel experience with our Designated Pre-Chartered
            Flights service at [Flight School Name]. Tailored for those seeking
            convenience and flexibility, our service allows you to customize
            your aerial itinerary, choosing destinations and schedules that
            align with your preferences. With a commitment to luxury, safety,
            and punctuality, we redefine private air travel, ensuring each
            journey is a seamless, comfortable, and memorable adventure above
            the clouds.
          </p>
        </section>
        <section id="content3">
          <div style={{ float: "left" }}>
            <h2 id="locations_text">We have Two Location</h2>
            <p id="locations_text">
              {" "}
              With dual locations strategically situated in [Location1] and
              [Location2], [Flight School Name] brings the joy of aviation
              education and services closer to enthusiasts, providing convenient
              access to top-notch flight training, aircraft rentals, and
              personalized experiences at two thriving hubs.
            </p>
            <h2 id="locations_text"> Locations and Directions</h2>
            <p id="locations_text">
              {/* <a href="#" onclick=>New Map(In new window)</a> */}
            </p>
          </div>
          <br />
          <br />
          <div id="dircontainer">
            <p id="textbutt">
              315 Turnpike St, North Andover, MA 01845 <br />
              <button
                type="button"
                id="buttock"
                onClick={() =>
                  getDirections1(
                    "https://www.google.com/maps/d/u/0/viewer?mid=1brlnn0LqP-XE4rFh4al4nhTonKY&hl=en&ll=42.751038324931415%2C-71.04867850000001&z=11"
                  )
                }
              >
                Get Direction
              </button>
            </p>
            <p id="textbutt">
              315 Turnpike St, North Andover, MA 01845
              <br />
              <button
                type="button"
                id="buttock"
                onClick={() =>
                  getDirections1(
                    "https://www.google.com/maps/d/u/0/viewer?mid=1brlnn0LqP-XE4rFh4al4nhTonKY&hl=en&ll=42.751038324931415%2C-71.04867850000001&z=11"
                  )
                }
              >
                Get Direction
              </button>
            </p>
          </div>
          <br />
          <br />

          <div style={{ float: "right", height: "50vh", width: "70%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBLEA8OMFiYaSYGG514kuc7Kve6l58YD7I",
              }}
              // defaultCenter={{ lat: latitude, lng: longitude }}
              defaultCenter={defaultProps.center}
              defaultZoom={16}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
              <AnyReactComponent
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </section>
        <section id="content4">
          <h3 id="about_text">List of Staff</h3>

          <div className="Row">
            <div className="Column">
              <div id="staff-Container">
                <img
                  className="staffimage"
                  src={Johnathan}
                  alt="pfp not found"
                />
                <p id="staffname">
                  Jonthan:{" "}
                  <b>
                    <i>Instructor</i>
                  </b>
                </p>
                <InstructorModal
                  model={"Jonthan"}
                  pfp={Johnathan}
                  ID={4}
                ></InstructorModal>
              </div>
            </div>
            <div className="Column">
              <div id="staff-Container">
                <img
                  className="staffimage"
                  src={Samantha}
                  alt="pfp not found"
                />
                <p id="staffname">
                  Samantha:{" "}
                  <b>
                    <i>Instructor</i>
                  </b>
                </p>
                <InstructorModal
                  model={"Samantha"}
                  pfp={Samantha}
                  ID={5}
                ></InstructorModal>
              </div>
            </div>
            <div className="Column">
              <div id="staff-Container">
                <img className="staffimage" src={Ea} alt="pfp not found" />
                <p id="staffname">
                  Eamonn :{" "}
                  <b>
                    <i>Instructor Supervisor</i>
                  </b>
                </p>
              </div>
              <InstructorModal
                model={"Eamonn"}
                pfp={Ea}
                ID={6}
              ></InstructorModal>
            </div>
          </div>
          <div className="Row">
            <div className="Column">
              <div id="staff-Container">
                <img className="staffimage" src={Angela} alt="pfp not found" />
                <p id="staffname">
                  Angela:{" "}
                  <b>
                    <i>Human Resources</i>
                  </b>
                </p>
              </div>
              <InstructorModal
                model={"Angela"}
                pfp={Angela}
                ID={1}
              ></InstructorModal>
            </div>
            <div className="Column">
              <div id="staff-Container">
                <img
                  className="staffimage"
                  src={Clarence}
                  alt="pfp not found"
                />
                <p id="staffname">
                  Clarence:{" "}
                  <b>
                    <i>Avation Mechanic</i>
                  </b>
                </p>
              </div>
              <InstructorModal model={"Clarence"} ID={2}></InstructorModal>
            </div>
            <div className="Column">
              <div id="staff-Container">
                <img className="staffimage" src={Thomas} alt="pfp not found" />
                <p id="staffname">
                  Thomas:{" "}
                  <b>
                    <i>Hiring Manager</i>
                  </b>
                </p>
                <InstructorModal
                  model={"Thomas"}
                  pfp={Thomas}
                  ID={3}
                ></InstructorModal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export default UserProfile1;
