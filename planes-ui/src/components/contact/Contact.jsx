
function validateForm() {
  console.log("actually running");
  const regemail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const basic_regex = new RegExp(regemail);
  const isValidEmail = basic_regex.test(
    document.getElementById("txtEmail").value
  );

  if (isValidEmail == false) {
    document.getElementById("lblError").innerHTML = "Enter valid email Address";
    return false;
  } else {
    document.getElementById("lblError").innerHTML = "";
    return true;
  }
}

import React, { useState } from 'react';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    message: '',
    subject: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Email sent successfully');
        // Handle success (e.g., show a success message to the user)
      } else {
        console.error('Failed to send email');
        // Handle failure (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Email Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} />
        </label>
        <br />
        <label>
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
