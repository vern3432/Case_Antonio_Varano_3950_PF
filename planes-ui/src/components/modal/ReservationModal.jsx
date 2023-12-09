import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function ReservationModal({ model }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>From: </Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>To: </Form.Label>
              <Form.Control
                type="date"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Instructor:</Form.Label>
              <Form.Select>
                <option>Instructor Name</option>
                <option>Instructor Name 2</option>
                <option>Instructor Name 3</option>
                <option>None</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
