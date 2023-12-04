import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleButton } from 'react-google-button';
import { gapi } from 'gapi-script';
import background from "./cessna.jpg";

function Login() {

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  const client_id = "951325617358-20v7s22jr35ahu01qdoeg0onh7hagu37.apps.googleusercontent.com"
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignupForm(!showSignupForm);
  };

  const onSuccess = (res) => {
    console.log("Login worked", res.profileObj);
  }

  const onFailure = (res) => {
    console.log("Login failed");
  }

  // Regex for email checking
  const validateEmail = (email) => {
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  /*
  * Given email from html, check validity and alter boxes
  * and buttons depending on response
  */
  const checkEmail = (inputId) => {
    const emailInput = (inputId === 'emailAddress') ? emailAddress : signupEmail;
    if (emailInput !== '' && !validateEmail(emailInput)) {
      alert("Invalid email");
    }
  };

  // Clear sign up fields and remove color from border on back btn click
  const clearSignUpFields = () => {
    setSignupEmail('');
  };

  // Clear log in fields and remove color from border on sign up btn click
  const clearLoginFields = () => {
    setEmailAddress('');
  };


  // Handle login form submission -> Navigate to new page on successfull login
  const decodeLoginFormResponse = () => {

  };

  // Handle sign up form submission -> Navigate to new page on successful sign up
  const decodeSignUpResponse = () => {

  };

  const [userType, setUserType] = useState(''); // Add state for the selected user type

  // Handle user type selection
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: ""
      })
    };
    gapi.load('client:auth2', start)
  })

  return (
    <div className="container-fluid" style={{
      backgroundImage: `url(${background})`, // Replace with the path to your image
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Login Form, default display */}
        <form
          id="loginForm"
          className={`opacity-75 rounded p-5 bg-light col-lg-6 col-md-9 col-sm-12  ${showLoginForm ? '' : 'd-none'}`}
        >
          <div className="text-center mb-4 custom-font-size">
            <h1> Log In </h1>
          </div>
          {/* Email input field, on foucus out will validate email 
                    with checkEmail() function found in Login_Signup.js */}
          <div className="mb-3">
            <label className="visually-hidden">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              className="form-control"
              placeholder="Email Address"
              required
              autoFocus
              onBlur={() => checkEmail('emailAddress')}
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          {/* Login button  */}
          <div className="d-grid gap-2">
            <button
              id="loginButton"
              type="button"
              className="btn btn-primary fw-bolder"
              onClick={decodeLoginFormResponse}
            >
              Log in
            </button>
          </div>
          {/* Google OAuth button */}
          <div className="mt-3 d-flex align-items-center justify-content-center">
            <h6>
              OR
            </h6>
          </div>
          <div className="mt-3 d-flex align-items-center justify-content-center">
            <GoogleLogin
              icon={false}
              clientId={client_id}
              render={renderProps => (
                <GoogleButton onClick={renderProps.onClick} style={{ color: 'black', backgroundColor: "white", width: '18rem', borderRadius: '3px' }} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}

            />
          </div>
          {/* Padding */}
          <div className="border-top my-3 mt-4 mb-4"></div>
          {/* Sign up button, clears login fields on click with clearLoginFields()
                    found in Login_Signup.js */}
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              onClick={() => { clearLoginFields(); toggleForm(); }}
              id="createAccountBtn"
              type="button"
              className="btn btn-success fw-bolder"
            >
              Create New Account
            </button>
          </div>

        </form>

        {/* Sign up form, default as hidden until toggeled */}
        <form
          id="signupForm"
          className={`opacity-75 rounded p-5 bg-light col-lg-6 col-md-9 col-sm-12 ${showSignupForm ? '' : 'd-none'}`}
        >
          <div className="text-center mb-4 custom-font-size">
            <h1> Sign Up </h1>
          </div>
          {/* Email input */}
          <div className="mb-3">
            <label className="visually-hidden">Email Address</label>
            <input
              type="email"
              id="signupEmail"
              className="form-control"
              placeholder="Email Address"
              required
              autoFocus
              onBlur={() => checkEmail('signupEmail')}
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          {/* Dropdown for user selection */}
          <div className="mb-3">
            <label className="visually-hidden">User Type</label>
            <select
              id="userType"
              className="form-control"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="" disabled>Select Account Type</option>
              <option value="Student">Student</option>
              <option value="Member">Member</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
          {/* Sign up button */}
          <div className="d-grid gap-2">
            <button
              id="signUpButton"
              onClick={decodeSignUpResponse}
              type="button"
              className="btn btn-primary fw-bolder"
            >
              Sign up
            </button>
          </div>
          {/* Back button, clear email input field */}
          <div className="d-grid gap-2 col-6 mx-auto mt-3">
            <button
              onClick={() => { clearSignUpFields(); toggleForm(); }}
              id="backBtn"
              type="button"
              className="btn btn-danger fw-bolder"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
