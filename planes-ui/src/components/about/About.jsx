import './about_style.css';
import GoogleMapReact from "google-map-react";
import Johnathan from "./vaguelyethnicman.png";
// import React, { useState } from "react";


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
          onClick={onselection(100)}
        ></input>
        <input
          id="radio2"
          type="radio"
          name="css-tabs"
          onClick={onselection(200)}
        ></input>
        <input
          id="radio3"
          type="radio"
          name="css-tabs"
          onClick={onselection(300)}
        ></input>
        <input
          id="radio4"
          type="radio"
          name="css-tabs"
          onClick={onselection(1000)}
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
            <h1>Who we are</h1>
            <p>Text Here</p>
            <h1>Our Mission</h1>
            <p>Text Here</p>
          </section>
          <section id="content2">
            <h2>Rentals</h2>
            <p>Text Here</p>
            <h2>Lessons</h2>
            <p>Text Here</p>
            <h2>Designated Trips</h2>
            <p>Text Here</p>
          </section>
          <section id="content3">
            <div style={{ float: "left" }}>
              <h3>Locations With Offer with Links to Directions redirect</h3>
              <p>We have Two Location</p>
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
                    Johnathan:{" "}
                    <b>
                      <i>Instructor</i>
                    </b>
                  </p>
                </div>
              </div>
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Johnathan}
                    alt="pfp not found"
                  />
                  <p id="staffname">
                    Johnathan:{" "}
                    <b>
                      <i>Instructor</i>
                    </b>
                  </p>
                </div>
              </div>
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Johnathan}
                    alt="pfp not found"
                  />
                  <p id="staffname">
                    Johnathan:{" "}
                    <b>
                      <i>Instructor</i>
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="Row">
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Johnathan}
                    alt="pfp not found"
                  />
                  <p id="staffname">
                    Johnathan:{" "}
                    <b>
                      <i>Instructor</i>
                    </b>
                  </p>
                </div>
              </div>
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Johnathan}
                    alt="pfp not found"
                  />
                  <p id="staffname">
                    Johnathan:{" "}
                    <b>
                      <i>Instructor</i>
                    </b>
                  </p>
                </div>
              </div>
              <div className="Column">
                <div id="staff-Container">
                  <img
                    className="staffimage"
                    src={Johnathan}
                    alt="pfp not found"
                  />
                  <p id="staffname">
                    Johnathan:{" "}
                    <b>
                      <i>Instructor</i>
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );





    
  }

export default About;