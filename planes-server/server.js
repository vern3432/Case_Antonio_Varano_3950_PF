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
    checkEmailQuery = db.prepare("SELECT * FROM Employees WHERE ID = ?");
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
// SELECT * 
// FROM user 
// WHERE user_id_1 = ? OR user_id_2 = ?;
app.post('/fetch-user-reserver', (req, res) => {
  const id  = req.body.id;
   console.log(id)
   let result;
   let checkEmailQuery;
   if (id !== undefined) {
     checkEmailQuery = db.prepare("SELECT * FROM reservations WHERE user_id_1 = ?");
     result = checkEmailQuery.get(id);
   } else {
 
   }
 
   if (result) {
     console.log(result);
     res.send(result);
   } else {
     res.status(500).send("error");
   }
 });

app.post("/get-employee2", async (req, res) => {
  const ID = req.body.ID;
  console.log(ID);
  console.log("getting employees");
  let result;
  let checkEmailQuery;
  if (ID !== undefined) {
    checkEmailQuery = db.prepare("SELECT * FROM Employees WHERE ID = ?");
    result = checkEmailQuery.get(ID);
  } else {

  }

  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(500).send("error");
  }
});

app.post("/get-user", async (req, res) => {
 const email = req.body.email;
   console.log(email);
   console.log("getting user");
   let result;
   let checkEmailQuery;
   if (email !== undefined) {
     checkEmailQuery = db.prepare("SELECT * FROM user WHERE email = ?");
     result = checkEmailQuery.get(email);
     console.log(result)
   } else {
     checkEmailQuery = db.prepare("SELECT * FROM user WHERE email = ?");
     result = checkEmailQuery.get("mark.case102@gmail.com");
     console.log(result)
   }
   if (result) {
     console.log(result);
     res.send(result);
   } else {
     res.status(500).send("error");
   }
 });


app.get("/get-users", async (req, res) => {
  const getPlanesQuery = db.prepare("SELECT * FROM user");
  res.send(getPlanesQuery.all());
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

app.get("/get-reservations", (req, res) => {
  const getReservationsQuery = db.prepare(`
    SELECT 
      r.reservation_id,
      r.fromDate,
      r.toDate,
      r.fromTime,
      r.toTime,
      r.flighttype,
      u1.email AS user_id_1_email,
      u2.email AS user_id_2_email,
      i.Name AS instructor_name,
      p.make AS plane_make,
      p.model AS plane_model,
      p.img_src AS img_src,
      c.comment
    FROM reservations r
    LEFT JOIN user u1 ON r.user_id_1 = u1.user_id
    LEFT JOIN user u2 ON r.user_id_2 = u2.user_id
    LEFT JOIN Employees i ON r.instructor_id = i.ID
    LEFT JOIN plane p ON r.plane_id = p.plane_id
    LEFT JOIN comments c ON r.comment_id = c.comment_id
  `);

  res.send(getReservationsQuery.all());
});


app.post('/saveReservation', async (req, res) => {
  try {
    const {
      activity,
      comment,
      fromDate,
      fromTime,
      optionalUser,
      plane_id,
      toDate,
      toTime,
      userId,
      instructor,
    } = req.body;

    // Print the extracted values
    console.log('Activity:', activity);
    console.log('Comment:', comment);
    console.log('From Date:', fromDate);
    console.log('From Time:', fromTime);
    console.log('Instructor:', instructor);
    console.log('Optional User:', optionalUser);
    console.log('Plane ID:', plane_id);
    console.log('To Date:', toDate);
    console.log('To Time:', toTime);
    console.log('User ID:', userId);

    // Check if the date and time values already exist for a given reservation
    // Check if there's any overlapping reservation for the given time range
    const checkOverlapQuery = db.prepare(`
    SELECT reservation_id FROM reservations
    WHERE plane_id = ? AND fromDate = ? AND toDate = ?
    AND (
      (fromTime >= ? AND fromTime < ?)
      OR (toTime > ? AND toTime <= ?)
      OR (fromTime <= ? AND toTime >= ?)
    )
  `);


    const existingReservation = checkOverlapQuery.get(
      plane_id,
      fromDate,
      toDate,
      fromTime,
      toTime,
      fromTime,
      toTime,
      fromTime,
      toTime
    );

    if (existingReservation) {
      return res.status(400).json({ error: 'Reservation for the given plane with the same date and time already exists.' });
    }

    const checkUserOverlapQuery = db.prepare(`
  SELECT reservation_id FROM reservations
  WHERE user_id_1 = ? 
  AND (
    (fromDate = ? AND fromTime < ? AND toTime > ?)
    OR (toDate = ? AND fromTime < ? AND toTime > ?)
    OR (fromDate < ? AND toDate > ?)
  )
`);

    const existingUserReservation = checkUserOverlapQuery.get(
      userId,
      fromDate,
      toTime,
      fromTime,
      fromDate,
      toTime,
      fromTime,
      fromDate,
      toDate
    );

    if (existingUserReservation) {
      return res.status(400).json({ error: 'User has another reservation during the specified date and time frame.' });
    }

    // TODO Check if the comment exists in the comments table, if it does grab its pk id else add the new comment and returns its pk id
    let commentId;
    const checkCommentQuery = db.prepare("SELECT comment_id FROM comments WHERE comment = ?");
    const existingComment = checkCommentQuery.get(comment);

    console.log("Existing comment", existingComment);

    if (existingComment) {
      commentId = existingComment.comment_id;
      console.log("id of existing comment", commentId);
    } else {
      const insertCommentQuery = db.prepare("INSERT INTO comments (comment) VALUES (?)");
      const result = insertCommentQuery.run(comment);
      console.log("result of insertion", result);
      commentId = result.lastInsertRowid;
      console.log("if of result", commentId);
    }

    // Save reservation data into the reservations table
    const sql = `
      INSERT INTO reservations (
        fromDate,
        toDate,
        fromTime,
        toTime,
        flighttype,
        user_id_1,
        user_id_2,
        plane_id,
        instructor_id,
        comment_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const statement = db.prepare(sql);
    statement.run(
      fromDate,
      toDate,
      fromTime,
      toTime,
      activity,
      userId,
      optionalUser,
      plane_id,
      instructor,
      commentId
    );

    console.log(`Reservation saved with ID: ${statement.lastInsertRowid}`);
    res.status(200).json({ message: 'Reservation saved successfully.' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.delete('/deleteReservation/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const userName = req.params.userName;

    console.log(userName);

    // Check if the reservation with the given ID exists
    const checkReservationQuery = db.prepare('SELECT * FROM reservations WHERE reservation_id = ?');
    const existingReservation = checkReservationQuery.get(reservationId);

    if (!existingReservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    // Delete the reservation with the given ID
    const deleteReservationQuery = db.prepare('DELETE FROM reservations WHERE reservation_id = ?');
    deleteReservationQuery.run(reservationId);

    console.log(`Reservation with ID ${reservationId} deleted successfully.`);
    res.status(200).json({ message: 'Reservation deleted successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.get("/", (req, res) => {
  res.send("Server is running");
});
