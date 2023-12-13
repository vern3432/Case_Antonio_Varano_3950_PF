import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";



var current_bio = "NA";
var Job_Description = "NA";
var Position = "NA";

function get_profile(ID) {
  console.log(ID)
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
    current_bio=data.Bio;
    Job_Description = data.Job_Description;
    Position = data.Position;

    })
    .catch((error) => console.log("Error fetching data: ", error));
}




// Creates the ReservationModal component with the option to choose the start and end date, the type of activity and if you want a instructor or not when doing the reservation of the plane
function InstructorModal({ model,pfp,ID }) {



        async function getInfor(){
        ///////add function to get indivudal instructor data and put into pop up 
        }
            

    get_profile(ID)
    console.log(Job_Description);

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
          <p>{Position}</p>
          <h1>Job Desc</h1>
          <p>{Job_Description}</p>
          <h1>Staff Bio</h1>
          <p>{current_bio}</p>
          <img src="" alt="" />
          <img src={pfp} alt="" />
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
