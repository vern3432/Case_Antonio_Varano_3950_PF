import cors from "cors";

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database("memory.db");

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Handle user google login
app.get("/initUser", (req, res) => {
    const email = req.query.email; // Get the user's email from the request query
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