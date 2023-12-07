import './contact_style.css';
import myimage from './kisspng-check-mark-icon-design-icon-black-checkmark-5a774ec74604e8.5772449315177683912868(3).png' // wherever is it.

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
function submitpost(){

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const content = document.getElementById('content').value;

  fetch('http://localhost:3001/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      name:name, 
      userEmail:email,
      subject:subject,
      content:content,

    }),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message || data.error);
    document.getElementById('pagecontent').innerHTML="<h1 style='color:black;'>Thank You for Contact Us!</h1><br><p style='color:black;'>We will get Back to You as soon as We can!</p>"
  })
  .catch(error => {
    alert('Error:', error);
    alert('A Local error occurred. Please try again.');
  });
}
// Contact.jsx

// import './contact_style.css';

const Contact = () => {
  console.log("cpntact function reading. ")
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form values
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const subject = event.target.elements.subject.value;
    const content = event.target.elements.content.value;

    // Prepare data in JSON format
    // const data = {
    //   name,
    //   email,
    //   subject,
    //   content,
    // };
    try {
      // Send POST request using fetch
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name:name, 
          userEmail:email,
          subject:subject,
          content:content,
 
      }),     
     
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
<body>
    <div id="pagecontent" className="container">
      <form id="post" action="" method="post">
        <h3>Send us an Email</h3>
        <fieldset>
          <label className="pagecontent" htmlFor="name">
            Your Name
            {/* <img src="open-book-icon-transparent-2.jpg" height="10" width="10" alt="Book Icon" /> */}
          </label><br />
          <input className="pagecontent" type="text" id="name" name="name" placeholder="Name Here" /><br />
        </fieldset>
        <fieldset>
          <label className="pagecontent" htmlFor="email">
           Your Email-Add auto fill from logged in user 
            {/* <img src="internet_img.png" height="10" width="10" alt="Internet Icon" /> */}
          </label><br />
          <input className="pagecontent" type="text" id="email" name="email" placeholder="Your Email Here" /><br />
        </fieldset>
        <fieldset>
          <label className="pagecontent" htmlFor="subject">
            Subject Line 
            {/* <img src="barcode_img.png" height="10" width="15" alt="Barcode Icon" /> */}
          </label><br />
          <input className="pagecontent" type="text" id="subject" name="subject" placeholder="Subject Line Here" /><br />
        </fieldset>
        <fieldset>
          <fieldset>
            <label className="pagecontent" htmlFor="content">
              Email Body
              {/* <img src="calendar_img.png" height="10" width="10" alt="Calendar Icon" /> */}
            </label><br />
            <textarea className="pagecontent" type="text" id="content" name="content" placeholder="Body Here" /><br />
          </fieldset>
        </fieldset>

        <fieldset>
          <button name="submit" type="button" onClick={() => submitpost()} id="post-submit" data-submit="...Sending">
            Submit
            <img src={myimage} id="submiticon" height="10" width="10" alt="Check Icon" />
          </button>
        </fieldset>
      </form>
    </div>
    </body>

  );
}

export default Contact;
