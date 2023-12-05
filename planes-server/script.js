const sql3 = require("better-sqlite3");
console.log("imported");

const db = new sql3("memory.db");
// const csv = require("csv-parser");
// const fs = require("fs");
console.log("imported");
// create table

//  db.exec( 'DROP TABLE menuItems;' );
db.exec("DROP TABLE IF EXISTS Users");
db.exec("DROP TABLE IF EXISTS Reservations");
db.exec("DROP TABLE IF EXISTS Planes");
console.log("table dropped");
db.exec(
  "CREATE TABLE IF NOT EXISTS Users (email TEXT PRIMARY KEY, user_type TEXT);"
);
console.log("table Users");
db.exec(
  "CREATE TABLE IF NOT EXISTS Planes (planid TEXT PRIMARY KEY, make TEXT, model TEXT,imagelink TEXT);"
);
console.log("table Planes");
//FOREIGN KEY(client1) REFERENCES Users(email)),FOREIGN KEY(instructor) REFERENCES Users(email)),FOREIGN KEY(client1) REFERENCES Users(email)),FOREIGN KEY(client2) REFERENCES Users(email)),FOREIGN KEY(planid) REFERENCES Planes(planid));
db.exec(
  "CREATE TABLE IF NOT EXISTS Reservations (DateTime TEXT, PlaneID TEXT,client1 TEXT,FOREIGN KEY(client1) REFERENCES Users(email), client2 TEXT,FOREIGN KEY(client2) REFERENCES Users(email),instructor TEXT,FOREIGN KEY(instructor) REFERENCES Users(email),planid TEXT,FOREIGN KEY(planid) REFERENCES Planes(planid));"
);

// db.exec(
//   "CREATE TABLE IF NOT EXISTS Users (email TEXT PRIMARY KEY, user TEXT);"
// );

db.exec("DROP TABLE IF EXISTS Users");
console.log("table dropped");
db.exec("CREATE TABLE IF NOT EXISTS Users (email TEXT, user TEXT);");
console.log("executed");

// const insrow = db.prepare(
//   "insert into Users (ISBN,Book_Title,Book_Author) VALUES (?, ?)"
// );
// fs.createReadStream('data2.csv')
//   .pipe(csv({"separator":","}))
//   .on('data', (row) => {
//     console.log(row)
//     insrow.run(row.ISBN,row.Book_Title,row.Book_Author,row.Year_Of_Publication,row.Publisher,row.Image_URL_S,row.Image_URL_M,row.Image_URL_L,'');
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//     db.close();
//   });
