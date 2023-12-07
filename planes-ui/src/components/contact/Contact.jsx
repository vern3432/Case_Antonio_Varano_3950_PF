
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


function Contact() {
return (
    <div>
      <h1>Content Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Input field with onChange handler to update state */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter something"
        />
        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;