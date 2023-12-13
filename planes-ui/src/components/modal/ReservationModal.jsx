import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function ReservationModal({ model, id }) {
  const plane_id = id;
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState(); // Value of employee dropdown selection
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [instructor, setInstructor] = useState(null); // Same as employee, strictly for use of dropdown disabling
  const [member, setMembers] = useState(null); // Value of member dropdown selection
  const [optionalUser, setUsers] = useState(null); // Same as member, strictly for use of dropdown disabling
  const [activity, setActivity] = useState();
  const [comment, setComment] = useState(null);
  const handleClose = () => setShow(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUser] = useState(null);

  // Get the cookie given the name. In our example, just look for the start 'userName='
  const getCookie = (name) => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name)) {
        const value = cookie.substring(name.length);
        return value;
      }
    }

    return null; // Cookie not found
  };


  // Extract the information from the userCookie into their own constants
  const extractUserInfo = (userCookie) => {
    const userInfo = {};

    // Extract email address
    const emailMatch = userCookie.match(/([^&]+)/);
    userInfo.email = emailMatch ? emailMatch[1] : null;

    // Extract userType
    const userTypeMatch = userCookie.match(/&userType=([^&]+)/);
    userInfo.userType = userTypeMatch ? userTypeMatch[1] : null;

    // Extract userId
    const userIdMatch = userCookie.match(/&userId=([^&]+)/);
    userInfo.userId = userIdMatch ? parseInt(userIdMatch[1], 10) : null;

    return userInfo;
  };

  // Call the get-employee endpoint when the reservation modal is opened
  const handleShow = async () => {
    setShow(true);
    await fetchEmployees();
    await fetchMembers();

  };


  useEffect(() => {
    const userCookie = getCookie('userName=');

    if (userCookie) {
      // Extract the cookie info
      const userInfo = extractUserInfo(userCookie);
      setUser(userInfo.userId);
      setUserType(userInfo.userType);
      console.log("the id: ", userId);
      console.log("the type: ", userType);
    }


  });


  const handleReserve = () => {
    setShow(false);

    //Send post request to create reservation
    // If the userCookie exists
    if (userId) {

      if (userType.toLowerCase() === "student" && instructor === null) {
        alert("Students must fly with an instructor");
      } else {


        // Data to be sent to save reservation
        const request = {
          userId,
          fromDate,
          toDate,
          fromTime,
          toTime,
          instructor,
          activity,
          plane_id,
          optionalUser,
          comment,
        };

        // Calculate total time
        const fromDateTime = new Date(`${fromDate}T${fromTime}`);
        const toDateTime = new Date(`${toDate}T${toTime}`);
        const totalTime = (toDateTime - fromDateTime) / (1000 * 60 * 60);


        console.log(totalTime);
        if (totalTime < 2 | totalTime > 336) {
          alert("Must reserve for at least 2 hours or less than 2 weeks");
        } else {
          // Save request to the database
          console.log("Data to be saved ", request);
          saveReservation(request);
        }

        const currentDate = new Date();
        if (fromDateTime < currentDate || toDateTime < currentDate) {
          alert("Selected date or time is past");
        }
      }
    } else {
      console.log("Failed to find a user cookie");
    }
  };

  const saveReservation = async (res) => {
    console.log("recieved res: ", res);
    try {
      const response = await fetch("http://localhost:3001/saveReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });

      const data = await response.json();

      // Handle the response here, depending on the server's response
      if (response.ok) {
        console.log("Good response from saveReservation endpoint");
      } else {
        console.log("Failed to fetch endpoint 'saveReservation'");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  async function fetchEmployees() {
    await fetch(`http://localhost:3001/get-employee`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log("Error fetching data: ", error));
  }

  async function fetchMembers() {
    await fetch(`http://localhost:3001/get-users`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.log("Error fetching data: ", error));
  }

  return (
    <>
      <Button
        className="mb-2 btn-sm"
        style={{ width: "100%" }}
        variant="primary"
        onClick={handleShow}
      >
        Reserve {model}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve {model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>From: </Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To: </Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>At: </Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setFromTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Until: </Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setToTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructor:</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setInstructor(e.target.value);
                }}
                disabled={optionalUser !== null && optionalUser !== "None"}
              >
                <option hidden>Please Select</option>
                {employees &&
                  employees.map((employee) => (
                    <option key={employee.ID} value={employee.ID}>
                      {employee.Name}
                    </option>
                  ))}
                <option>None</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Co-pilot:</Form.Label>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-copilot">
                    {userType && userType.toLowerCase() === "student"
                      ? "Co-pilot selection is disabled for students."
                      : "Select a co-pilot to fly with"}
                  </Tooltip>
                }
              >
                <Form.Select
                  onChange={(e) => {
                    setUsers(e.target.value);
                  }}
                  disabled={(userType === "Student" | instructor !== null && instructor !== "None")}
                >
                  <option hidden>Please Select</option>
                  {member &&
                    member.map((member) => (
                      <option key={member.user_id} value={member.user_id}>
                        {member.email}
                      </option>
                    ))}
                  <option>None</option>
                </Form.Select>
              </OverlayTrigger>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activity:</Form.Label>
              <Form.Select onChange={(e) => setActivity(e.target.value)}>
                <option hidden>Please Select</option>
                <option>Recreation</option>
                <option>Training</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Additional Comments:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleReserve}
            disabled={!fromDate || !toDate || !toTime || !fromTime || !activity} // Make Reservation button is disabled until all fields are filled
          >
            Make Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReservationModal;
