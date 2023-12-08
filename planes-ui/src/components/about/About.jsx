import './about_style.css';
import GoogleMapReact from "google-map-react";

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
      <main>
        <h1>About Us</h1>
        <input id="radio1" type="radio" name="css-tabs"></input>
        <input id="radio2" type="radio" name="css-tabs"></input>
        <input id="radio3" type="radio" name="css-tabs"></input>
        <input id="radio4" type="radio" name="css-tabs"></input>
        <div id="tabs">
          <label id="tab1" for="radio1">
            Our Company{" "}
          </label>
          <label id="tab2" for="radio2">
            Services
          </label>
          <label id="tab3" for="radio3">
            Locations
          </label>
          <label id="tab4" for="radio4">
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
          </section>
          <section id="content3">
            <h3>Locations With Offer with Links to Directions redirect</h3>

            <div style={{ height: "50vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "YOUR KEY" }}
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={16}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              ></GoogleMapReact>
           
           
            </div>
          </section>
          <section id="content4">
            <h3>List of Staff</h3>
          </section>
        </div>
      </main>
    );





    
  }

export default About;