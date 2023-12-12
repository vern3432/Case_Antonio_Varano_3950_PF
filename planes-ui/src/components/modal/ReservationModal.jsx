import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function ReservationModal({ model }) {
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState();

  const handleClose = () => setShow(false);

  // Call the get-employee endpoint when the reservation modal is opened
  const handleShow = async () => {
    setShow(true);
    await fetchEmployees();
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
      <Button className="m-2" variant="primary" onClick={handleShow}>
        Reserve
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
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To: </Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instructor:</Form.Label>
              <Form.Select>
                {employees &&
                  employees.map((employee) => (
                    <option key={employee.ID}>{employee.Name}</option>
                  ))}
                <option>None</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activity:</Form.Label>
              <Form.Select>
                <option>Recreation</option>
                <option>Class</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReservationModal;
