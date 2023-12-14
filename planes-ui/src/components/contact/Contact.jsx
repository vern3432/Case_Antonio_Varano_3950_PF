import Button from "react-bootstrap/esm/Button";
import "./contact_style.css";
import { useState } from "react";

const Contact = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();

  function validateForm() {
    console.log("actually running");
    const regemail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const basic_regex = new RegExp(regemail);
    const isValidEmail = basic_regex.test(
      document.getElementById("txtEmail").value
    );

    if (isValidEmail === false) {
      document.getElementById("lblError").innerHTML =
        "Enter valid email Address";
      return false;
    } else {
      document.getElementById("lblError").innerHTML = "";
      return true;
    }
  }

  function submitpost() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const content = document.getElementById("content").value;

    fetch("http://localhost:3001/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        userEmail: email,
        subject: subject,
        content: content,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((error) => {
        alert("Error:", error);
        alert("A Local error occurred. Please try again.");
      });
  }

  function autoFill() {
    localStorage.getItem("curremail");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form values
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const subject = event.target.elements.subject.value;
    const content = event.target.elements.content.value;

    try {
      // Send POST request using fetch
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          userEmail: email,
          subject: subject,
          content: content,
        }),
      });

      // Handle response as needed
      if (response.ok) {
        // Request was successful
        console.log("Message sent successfully!");
      } else {
        // Request failed
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div id="pagecontent" className="container">
      {isFormSubmitted && (
        <div id="thank-you-message">
          <h1>Thank you for contacting us!</h1>
          <span>We will get back to you as soon as we can!</span>
        </div>
      )}
      <form id="post" action="" method="post">
        <h3>Send us an Email</h3>
        <fieldset>
          <label className="pagecontent" htmlFor="name">
            Your Name
            {/* <img src="open-book-icon-transparent-2.jpg" height="10" width="10" alt="Book Icon" /> */}
          </label>
          <br />
          <input
            className="pagecontent"
            type="text"
            id="name"
            name="name"
            placeholder="Name Here"
            onChange={(x) => setName(x)}
          />
          <br />
        </fieldset>
        <fieldset>
          <label className="pagecontent" htmlFor="email">
            Your Email
            {/* <img src="internet_img.png" height="10" width="10" alt="Internet Icon" /> */}
          </label>
          <br />
          <input
            className="pagecontent"
            type="text"
            id="email"
            name="email"
            placeholder="Your Email Here"
            onChange={(x) => setEmail(x)}
          />
          <br />
        </fieldset>
        <fieldset>
          <label className="pagecontent" htmlFor="subject">
            Subject Line
            {/* <img src="barcode_img.png" height="10" width="15" alt="Barcode Icon" /> */}
          </label>
          <br />
          <input
            className="pagecontent"
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject Line Here"
            onChange={(x) => setSubject(x)}
          />
          <br />
        </fieldset>
        <fieldset>
          <fieldset>
            <label className="pagecontent" htmlFor="content">
              Email Body
              {/* <img src="calendar_img.png" height="10" width="10" alt="Calendar Icon" /> */}
            </label>
            <br />
            <textarea
              className="pagecontent"
              type="text"
              id="content"
              name="content"
              placeholder="Body Here"
              onChange={(x) => setContent(x)}
            />
            <br />
          </fieldset>
        </fieldset>

        <fieldset id="submit-btn">
          <Button
            name="submit"
            type="button"
            onClick={() => submitpost()}
            id="post-submit"
            data-submit="...Sending"
            disabled={!name || !email || !subject || !content}
          >
            Submit
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
