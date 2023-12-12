import './about_style.css';
import GoogleMapReact from "google-map-react";
import Johnathan from "./vaguelyethnicman.png";
import Samantha from './lightskinlady.jpg'
import Ea from "./manthinking.jpg";
import Angela from "./istockphoto-1394347360-612x612.jpg";
import Clarence from "./balddude.jpg";
import Thomas from "./oldwhitedude.jpg";

// import React, { useState } from "react";

import InstructorModal from "./instructorabout";








var [mainHeight, setMainHeight] = [10, 10]; 
function onselection(input){
      mainHeight=input; 
      console.log("ran:"+input)
}
function About() {

    const latitude = 42.6685;
    const longitude = 42.6685;

 const renderMarkers = (map, maps) => {
              let marker = new maps.Marker({
                position: { lat: latitude, lng: longitude },
                map,
                title: "Hello World!",
              });
              return marker;
            };

    return (
      <main style={{ height: `${mainHeight}px` }}>
        <h1>About Us</h1>
        <input
          id="radio1"
          type="radio"
          name="css-tabs"
          value="1"
          oncheck={onselection(100)}
        ></input>
        <input
          id="radio2"
          type="radio"
          name="css-tabs"
          value="2"
          onchecked={onselection(200)}
        ></input>
        <input
          id="radio3"
          type="radio"
          name="css-tabs"
          value="3"
          onchecked={onselection(300)}
        ></input>
        <input
          id="radio4"
          type="radio"
          name="css-tabs"
          value="3"
          onchecked={onselection(1200)}
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
            <h1 id='about_text'>Who we are</h1>
            <p  id='about_text'>"Welcome to [Flight School Name], where dreams take flight and passion soars high. Nestled in the heart of [Location], we are a local flight school committed to cultivating a new generation of skilled aviators. With experienced instructors, state-of-the-art facilities, and a dedication to safety, we provide a nurturing environment for aspiring pilots to spread their wings and achieve their aviation goals."</p>
            <h1 id='about_text'>Our Mission</h1>
            <p id='about_text'>"At [Flight School Name], our mission is to inspire and empower individuals to embrace the skies. We strive to deliver exceptional flight training that not only instills technical expertise but also fosters a profound love for aviation. Through unwavering commitment to safety, innovation, and personalized guidance, we aim to propel our students toward successful careers in aviation while nurturing a lifelong passion for the boundless freedom of the skies."</p>
          </section>
          <section id="content2">
            <h2 id='about_text' >Rentals</h2>
            <p id='about_text'>Explore the joy of flying with our premier aircraft rental service at [Flight School Name]. Whether you're a seasoned pilot or embarking on your first solo adventure, our diverse fleet of well-maintained aircraft is at your fingertips. Experience the thrill of the open skies with our reliable rentals, backed by our commitment to safety and quality, ensuring every flight is a seamless and exhilarating journey</p>
            <h2 id='about_text'>Lessons</h2>
            <p id='about_text'>At [Flight School Name], our lessons are tailored to transform aspirations into aviator achievements. Led by seasoned instructors, our comprehensive flight lessons blend theory with hands-on experience, providing a dynamic and personalized learning environment. From the basics of takeoff to mastering intricate maneuvers, we guide aspiring pilots through every stage of their aviation journey, fostering confidence and competence in the exhilarating realm of flight.</p>
            <h2 id='about_text'>Designated Pre-Chartered Flights</h2>
            <p id='about_text'>Elevate your travel experience with our Designated Pre-Chartered Flights service at [Flight School Name]. Tailored for those seeking convenience and flexibility, our service allows you to customize your aerial itinerary, choosing destinations and schedules that align with your preferences. With a commitment to luxury, safety, and punctuality, we redefine private air travel, ensuring each journey is a seamless, comfortable, and memorable adventure above the clouds.</p>
          </section>
          <section id="content3">
            <div style={{ float: "left" }}>
              <h3  id='locations_text' >Locations With Offer with Links to Directions redirect</h3>
              <p  id='locations_text' >We have Two Location</p>
            </div>
            <div style={{ float: "right", height: "50vh", width: "70%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBLEA8OMFiYaSYGG514kuc7Kve6l58YD7I",
                }}
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={16}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              ></GoogleMapReact>
            </div>
          </section>
          <section id="content4">
            <h3>List of Staff</h3>

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
                    ID={"00004"}
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
                    ID={"00005"}
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
                  ID={"00006"}
                ></InstructorModal>
              </div>
            </div>
            <div className="Row">
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Angela}
                    alt="pfp not found"
                  />
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
                  ID={"00001"}
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
                <InstructorModal
                  model={"Clarence"}
                  ID={"00002"}
                ></InstructorModal>
              </div>
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Thomas}
                    alt="pfp not found"
                  />
                  <p id="staffname">
                    Thomas:{" "}
                    <b>
                      <i>Hiring Manager</i>
                    </b>
                  </p>
                  <InstructorModal
                    model={"Thomas"}
                    pfp={Thomas}

                    ID={"00003"}
                  ></InstructorModal>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );





    
  }

export default About;