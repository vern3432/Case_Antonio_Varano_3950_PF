import './about_style.css';

function About() {
    return <main>
    <h1>About Us</h1>
    <input id="radio1" type="radio" name="css-tabs" ></input>
    <input id="radio2" type="radio" name="css-tabs"></input>
    <input id="radio3" type="radio" name="css-tabs"></input>
    <input id="radio4" type="radio" name="css-tabs"></input>
    <div id="tabs">
      <label id="tab1" for="radio1">Our Company </label>
      <label id="tab2" for="radio2">Services</label>
      <label id="tab3" for="radio3">Locations</label>
      <label id="tab4" for="radio4">Our Staff</label>
    </div>
    <div id="content">
      <section id="content1">
        <h3>Information Comapny and Origin</h3>
      </section>
      <section id="content2">
      <h3>Information of Offered Servers</h3>

      </section>
      <section id="content3">
      <h3>Locations With Offer with Links to Directions redirect</h3>

      </section>
      <section id="content4">
      <h3>List of Staff</h3>
     
      </section>
    </div>

  </main>





    
  }

export default About;