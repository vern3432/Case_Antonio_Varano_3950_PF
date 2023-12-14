import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";

// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function InstructorModal({ model, pfp, ID }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentBio, setCurrentBio] = useState("NA");
  const [jobDescription, setJobDescription] = useState("NA");
  const [position, setPosition] = useState("NA");

  function get_profile(ID) {
    console.log(ID);
    fetch("http://localhost:3001/get-employee2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: ID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentBio(data.Bio);
        setJobDescription(data.Job_Description);
        setPosition(data.Position);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  }

  useEffect(() => {
    get_profile(ID);
  }, [ID]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className="m-2" variant="primary" onClick={handleShow}>
          More Info
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Staff: {model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Job Title</h5>
          <p>{position}</p>
          <h5>Job Description</h5>
          <p>{jobDescription}</p>
          <h5>Staff Bio</h5>
          <p>{currentBio}</p>
          <img src={pfp} alt="" id="contactpageimage" />
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
