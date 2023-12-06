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