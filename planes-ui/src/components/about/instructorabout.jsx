import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function InstructorModal({ model,pfp }) {



        async function getInfor(){
        ///////add function to get indivudal instructor data and put into pop up 
        }
            






  const [show, setShow] = useState(false);




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        More Info
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Staff: {model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Job Title Here</h1>
          <h1>Job Desc</h1>
          <h1>Staff Bio</h1>
          <img src="" alt="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InstructorModal;
