//TODO For the back end
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = 3001;
// var async=require('async')

// const dbPath = path.resolve(__dirname, "memory.db");
// const db = new sqlite3.Database(dbPath);