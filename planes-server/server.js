const express = require("express");
const cors = require('cors');
const sql3 = require("better-sqlite3");
const db = new sql3("memory.db");
const path = require("path");


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Handle user google login
app.post("/existingUser", (req, res) => {

    const email = req.body.email; // Get the user's email from the request query
    console.log(email);

    // Check if the email exists in the user table
    const checkEmailQuery = db.prepare("SELECT COUNT(*) as count FROM user WHERE email = ?");
    const result = checkEmailQuery.get(email);

    if (result.count > 0) {
        // If the email exists, return true
        res.json({ exists: true });
    } else {
        // If the email doesn't exist, return an error
        res.status(404).json({ error: "Email not found" });
    }
});

// Handle new signup
app.post("/newUser", (req, res) => {
    const email = req.body.email; // Get the user's email from the request query
    console.log(email);
    const user_type = req.body.user_type; // Get the user's user_type from the request query
    console.log(user_type);

    const viewPlaneData = db.prepare("SELECT * FROM user");
    console.log("\nPlane Table:");
    console.log(viewPlaneData.all());

    // Check if the email exists in the user table
    const checkEmailQuery = db.prepare("SELECT COUNT(*) as count FROM user WHERE email = ?");
    const result = checkEmailQuery.get(email);

    if (result.count > 0) {
        // If the email exists, return false
        res.status(404).json({ error: "Email already registered" });
    } else {
        // Insert the email and user_type into user table
        const insertUserQuery = db.prepare("INSERT INTO user (email, user_type) VALUES (?, ?)");
        insertUserQuery.run(email, user_type);

        res.json({ success: true });
    }
});