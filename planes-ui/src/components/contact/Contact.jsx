
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

// Contact.jsx


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
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required />

        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
