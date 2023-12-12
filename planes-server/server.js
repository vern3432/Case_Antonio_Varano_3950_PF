const express = require("express");
const cors = require("cors");
const sql3 = require("better-sqlite3");
const db = new sql3("memory.db");
const nodemailer = require("nodemailer");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const bodyParser = require("body-parser");

// To check functionality, login in like this. There is no auth or anything on the account. Its just gmail
// planeservice7@gmail.com
// 123Planes!
// That is for two fact, the weird password below uses prepared app sign-ins. You can see this under the account in the 2 factor section.
app.use(bodyParser.json());
app.post("/send-email", async (req, res) => {
  const userName = req.body.name;
  const subject = req.body.subject;
  const userEmail = req.body.userEmail;
  const content = req.body.content;
  const ownerEmail = "planeservice7@gmail.com";
  const password = "pzjq vnyk zygs ciqe";
  try {
    // Replace these with your actual email configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: ownerEmail,
        pass: password,
      },
    });
    const mailOptions = {
      from: ownerEmail,
      to: ownerEmail,
      cc: userEmail,
      subject: subject,
      text: `Name: ${userName}\nEmail: ${userEmail}\nMessage: ${content}`,
    };
    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/get-employee", async (req, res) => {
  const ID = req.query.ID;
  console.log(ID);
  console.log("getting employees");
  let result;
  let checkEmailQuery;
  if (ID !== undefined) {
    checkEmailQuery = db.prepare("SELECT * FROM User WHERE ID = ?");
    result = checkEmailQuery.get(ID);
  } else {
    checkEmailQuery = db.prepare("SELECT * FROM Employees");
    result = checkEmailQuery.all();
  }

  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(500).send("error");
  }
});

app.get("/get-users", async (req, res) => {
  const ID = req.query.ID;
  console.log(ID);
  console.log("getting users");
  let result;
  let checkEmailQuery;

  checkEmailQuery = db.prepare("SELECT * FROM User");
  result = checkEmailQuery.all();

  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(500).send("error");
  }
});

// Handle google oauth and login form
app.post("/existingUser", (req, res) => {
  const email = req.body.email; // Get the user's email from the request query
  console.log(email);

  const viewPlaneData = db.prepare("SELECT * FROM user");
  console.log("\nPlane Table:");
  console.log(viewPlaneData.all());

  // Check if the email exists in the user table
  const checkEmailQuery = db.prepare(
    "SELECT COUNT(*) as count FROM user WHERE email = ?"
  );
  const result = checkEmailQuery.get(email);

  // Get all the values given the email and append to response
  const viewUserData = db.prepare("SELECT * FROM user WHERE email = ?");
  const userData = viewUserData.get(email);

  if (result.count > 0) {
    res.json({ success: true, user: userData });
  } else {
    // If the email exists, return false
    res.status(404).json({ error: "Email not registered" });
  }
});

// Handle new signup
app.post("/newUser", (req, res) => {
  const email = req.body.email; // Get the user's email from the request query
  const user_type = req.body.user_type; // Get the user's user_type from the request query

  // Check if the email exists in the user table
  const checkEmailQuery = db.prepare(
    "SELECT COUNT(*) as count FROM user WHERE email = ?"
  );
  const result = checkEmailQuery.get(email);

  if (result.count > 0) {
    // If the email exists, return false
    res.status(404).json({ error: "Email already registered" });
  } else {
    // Insert the email and user_type into user table
    const insertUserQuery = db.prepare(
      "INSERT INTO user (email, user_type) VALUES (?, ?)"
    );
    insertUserQuery.run(email, user_type);

    // Get all the values given the email and append to response
    const viewUserData = db.prepare("SELECT * FROM user WHERE email = ?");
    const userData = viewUserData.get(email);

    res.json({ success: true, user: userData });
  }
});

// Get all planes from the plane table from the database
app.get("/get-planes", (req, res) => {
  const getPlanesQuery = db.prepare("SELECT * FROM plane");
  res.send(getPlanesQuery.all());
});

app.post("/saveReservation", (req, res) => {
  const data = req.body; // Get the user's email from the request query
  console.log(data);

  // const viewPlaneData = db.prepare("SELECT * FROM user");
  // console.log("\nPlane Table:");
  // console.log(viewPlaneData.all());

  // // Check if the email exists in the user table
  // const checkEmailQuery = db.prepare(
  //   "SELECT COUNT(*) as count FROM user WHERE email = ?"
  // );
  // const result = checkEmailQuery.get(email);

  // if () {
  //   res.json({ success: true });
  // } else {
  //   // If the email exists, return false
  //   res.status(404).json({ error: "Save reservation failed to save" });
  // }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
