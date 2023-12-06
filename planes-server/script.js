const sql3 = require("better-sqlite3");

const db = new sql3("memory.db");

const createTablesQuery = `
    -- Create User Table
    CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR NOT NULL,
        user_type VARCHAR NOT NULL
    );

    -- Create Plane Table
    CREATE TABLE IF NOT EXISTS plane (
        plane_id INTEGER PRIMARY KEY AUTOINCREMENT,
        Year YEAR,
        make VARCHAR NOT NULL,
        model VARCHAR NOT NULL,
        img_src VARCHAR NOT NULL,
        tail_number VARCHAR NOT NULL 
    );

    -- Create Comments Table
    CREATE TABLE IF NOT EXISTS comments (
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        comment VARCHAR
    );

    -- Create Reservations Table
    CREATE TABLE IF NOT EXISTS reservations (
        reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime DATETIME NOT NULL,
        flighttype VARCHAR NOT NULL,
        user_id_1 INTEGER NOT NULL,
        user_id_2 INTEGER,
        plane_id INTEGER NOT NULL,
        comment_id INTEGER,
        FOREIGN KEY (user_id_1) REFERENCES user(user_id),
        FOREIGN KEY (user_id_2) REFERENCES user(user_id),
        FOREIGN KEY (plane_id) REFERENCES plane(plane_id),
        FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
    );
`;

db.exec(createTablesQuery);

const viewPlaneData = db.prepare("SELECT * FROM plane");
console.log("\nPlane Table:");
console.log(viewPlaneData.all());

const viewUserData = db.prepare("SELECT * FROM user");
console.log("\nUser Table:");
console.log(viewUserData.all());