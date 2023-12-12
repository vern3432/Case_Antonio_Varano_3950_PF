import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const getCookie = (name) => {
  const cookieString = document.cookie;
  console.log("cookie string", cookieString);
  const cookies = cookieString.split('; ');
  console.log("cookies", cookies);
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    console.log("cookiedName", cookieName);
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null; // Cookie not found
};

// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function ReservationModal({ model, id }) {
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState();
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [instructor, setInstructor] = useState();
  const [activity, setActivity] = useState();

  const handleClose = () => setShow(false);

  // Call the get-employee endpoint when the reservation modal is opened
  const handleShow = async () => {
    setShow(true);
    await fetchEmployees();
  };

  const handleReserve = () => {
    setShow(false);
    //TODO send post request to create reservation

    const userName = getCookie('userName');

    if (userName) {
      console.log('User name retrieved:', userName);


      const request = { userName, fromDate, toDate, fromTime, toTime, instructor, activity, id };

      const fromDateTime = new Date(`${fromDate}T${fromTime}`);
      const toDateTime = new Date(`${toDate}T${toTime}`);
      const totalTime = (toDateTime - fromDateTime) / (1000 * 60 * 60); // Convert milliseconds to hours

      console.log("Total time: ", totalTime);

      if (totalTime < 2) {
        console.log("Must reserve for at least 2 hours");
      } else {
        // TODO: Save request to the database
        console.log(request);
      }
    } else {
      console.log('User name cookie not found');
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
              <Form.Label>From: </Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setFromTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To: </Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setToTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructor:</Form.Label>
              <Form.Select onChange={(e) => setInstructor(e.target.value)}>
                <option hidden>Please Select</option>
                {employees &&
                  employees.map((employee) => (
                    <option key={employee.ID}>{employee.Name}</option>
                  ))}
                <option>None</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activity:</Form.Label>
              <Form.Select onChange={(e) => setActivity(e.target.value)}>
                <option hidden>Please Select</option>
                <option>Recreation</option>
                <option>Class</option>
              </Form.Select>
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
            disabled={!fromDate || !toDate || !instructor || !activity} // Make Reservation button is disabled until all fields are filled
          >
            Make Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReservationModal;
