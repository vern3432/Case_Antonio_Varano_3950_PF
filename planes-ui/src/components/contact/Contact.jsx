import './contact_style.css';
function validateForm() {
  console.log("actually running");
  const regemail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const basic_regex = new RegExp(regemail);
  const isValidEmail = basic_regex.test(
    document.getElementById("txtEmail").value
  );

  if (isValidEmail === false) {
    document.getElementById("lblError").innerHTML = "Enter valid email Address";
    return false;
  } else {
    document.getElementById("lblError").innerHTML = "";
    return true;
  }
}
function submitpost(){}
// Contact.jsx

// import './contact_style.css';

const Contact = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form values
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const subject = event.target.elements.subject.value;
    const content = event.target.elements.content.value;

    // Prepare data in JSON format
    const data = {
      name,
      email,
      subject,
      content,
    };
    try {
      // Send POST request using fetch
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle response as needed
      if (response.ok) {
        // Request was successful
        console.log('Message sent successfully!');
      } else {
        // Request failed
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    
    <div id="pagecontent" className="container">
      <form id="post" action="" method="post">
        <h3>Send us an Email</h3>
        <fieldset>
          <label className="pagecontent" htmlFor="title">
            Your Name
            {/* <img src="open-book-icon-transparent-2.jpg" height="10" width="10" alt="Book Icon" /> */}
          </label><br />
          <input className="pagecontent" type="text" id="title" name="title" placeholder="Name Here" /><br />
        </fieldset>
        <fieldset>
          <label className="pagecontent" htmlFor="url">
           Your Email-Add auto fill from logged in user 
            {/* <img src="internet_img.png" height="10" width="10" alt="Internet Icon" /> */}
          </label><br />
          <input className="pagecontent" type="text" id="url" name="url" placeholder="Your Email Here" /><br />
        </fieldset>
        <fieldset>
          <label className="pagecontent" htmlFor="ISBN">
            Subject Line 
            {/* <img src="barcode_img.png" height="10" width="15" alt="Barcode Icon" /> */}
          </label><br />
          <input className="pagecontent" type="text" id="ISBN" name="ISBN" placeholder="Subject Line Here" /><br />
        </fieldset>
        <fieldset>
          <fieldset>
            <label className="pagecontent" htmlFor="Pub_Year">
              Email Body
              {/* <img src="calendar_img.png" height="10" width="10" alt="Calendar Icon" /> */}
            </label><br />
            <input className="pagecontent" type="text" id="Pub_Year" name="Pub_Year" placeholder="Body Here" /><br />
          </fieldset>
        </fieldset>

        <fieldset>
          <button name="submit" type="button" onClick={() => submitpost()} id="post-submit" data-submit="...Sending">
            Submit
            <img src="./check_img.png" height="10" width="10" alt="Check Icon" />
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Contact;
