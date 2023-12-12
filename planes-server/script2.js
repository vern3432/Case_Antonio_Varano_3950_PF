const sql3 = require("better-sqlite3");

const db = new sql3("memory.db");


db.exec("DROP TABLE IF EXISTS Employees");
console.log("table dropped");
db.exec(
  "CREATE TABLE IF NOT EXISTS Employees (ID TEXT,Name TEXT, Position TEXT,Job_Description TEXT,Bio TEXT );"
);
console.log("executed");

const insrow = db.prepare(
  "insert into Employees (ID,Name , Position ,Job_Description ,Bio) VALUES (?,?, ?,?,?)"
);
insrow.run(
  "1",
  "Angela ",
  "Human Resources",
  "In her current role as a Human Resources Specialist at XYZ Solutions, Angela Smith oversees talent acquisition strategies and employee engagement initiatives. Leveraging her expertise, she contributes to creating a positive work environment and fosters a culture that aligns with the company's values, ensuring the acquisition and retention of top-tier talent.",
  "Angela Smith is a results-driven HR professional with a Bachelor's in Human Resource Management and an MBA in Organizational Development. Starting her career at DEF Corporation, she excelled in talent acquisition and employee relations, leading to her current role as a Human Resources Specialist at XYZ Solutions. Angela is known for her commitment to diversity and inclusion, actively contributing to a positive work culture and staying abreast of industry trends through continuous learning. She aspires to take on leadership roles, leveraging her skills to drive organizational success."
);
insrow.run(
  "2",

  "Clarence ",
  "Avation Mechanic",
  "As a mechanic at the flight school, Clarence conducts thorough inspections, repairs, and maintenance on a variety of training aircraft, ensuring they meet stringent safety standards. His expertise and attention to detail contribute significantly to the school's reputation for providing top-notch, reliable aircraft for student pilots.",
  "Clarence is a seasoned aviation mechanic with a passion for ensuring the safety and reliability of aircraft. With over a decade of experience, he has honed his skills at a prominent flight school, where he meticulously maintains and troubleshoots a diverse fleet of training aircraft. Known for his dedication to precision and commitment to aviation excellence, Clarence plays a crucial role in keeping the skies safe for aspiring pilots."
);

insrow.run(
  "3",

  "Thomas",
  "Hiring Manager",
  "As the hiring manager at a prominent flight school, Thomas oversees the selection and recruitment of aspiring pilots, evaluating their skills, dedication to safety, and overall suitability for the aviation profession. Leveraging his extensive background in aviation operations, Thomas ensures that the school maintains a roster of exceptional individuals who are not only qualified but also poised for success in their future careers.",
  "Thomas is a seasoned aviation professional with a passion for fostering talent in the skies. As the hiring manager at a prestigious flight school, he brings a wealth of experience and knowledge to the recruitment process, ensuring that aspiring pilots not only meet stringent standards but also embody a deep commitment to safety and excellence. With a background in aviation operations and a keen eye for potential, Thomas plays a pivotal role in shaping the next generation of aviators, guiding them towards successful and fulfilling careers in the aviation industry."
);
insrow.run(
  "4",

  "Johnathan",
  "Instructor",
  "As an instructor and pilot at our flight school, Johnathan is responsible for delivering comprehensive and engaging aviation instruction to students of varying experience levels. He adeptly combines his wealth of flying expertise with effective teaching methodologies, ensuring students receive top-notch training and guidance as they progress towards their pilot certifications.",
  "Johnathan is a seasoned aviator and dedicated flight instructor at our local flight school, bringing over two decades of flying experience to the classroom and the cockpit. His passion for aviation ignited at an early age, propelling him to earn his pilot's license at 18. With a commitment to fostering the next generation of skilled pilots, Johnathan's engaging teaching style and wealth of practical knowledge make him an invaluable asset to our aviation community. Whether guiding aspiring pilots through their first solo flights or sharing his love for the skies, Johnathan is a trusted mentor who inspires confidence and proficiency in the art of flight."
);

insrow.run(
  "5",

  "Samantha",
  "Instructor",
  "Currently, Samantha serves as an instructor and pilot at our local flight school, where she skillfully imparts her aviation expertise to students while also logging hours in the cockpit herself. Combining her instructional prowess with hands-on flying, she plays a pivotal role in shaping the next generation of skilled and safety-conscious aviators.",
  "Samantha is a seasoned aviation professional with a passion for both teaching and flying. As an instructor at our local flight school, she brings a wealth of knowledge and experience to the classroom and cockpit. With a strong commitment to safety and a knack for explaining complex aviation concepts in an accessible manner, Samantha inspires and guides aspiring pilots on their journey to mastering the skies. Her dedication to excellence and infectious enthusiasm make her an invaluable asset to our aviation community."
);
insrow.run(
  "6",
  "Eamonn",
  "Instructor Supervisor",
  "As the instructor supervisor at a leading flight school, Eamonn oversees the training and development of aspiring pilots, ensuring compliance with industry regulations and safety standards. He plays a pivotal role in maintaining the school's reputation for delivering top-notch aviation education by managing instructor performance and curriculum quality.",
  "Eamonn is a seasoned aviation professional and dedicated instructor supervisor at a prestigious flight school. With a wealth of experience in both piloting and instructional roles, he brings a comprehensive understanding of aviation principles and safety protocols to his role. Eamonn is known for his exceptional leadership skills, fostering a positive learning environment for aspiring pilots, and his commitment to ensuring the highest standards of training at the flight school."
);




