import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Creates the modal for the event in the schedule page
function BookingModal({ show, handleClose, reservation }) {
  return (
    <Modal show={show} animation={false}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Reservation Information </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>User:</strong> {reservation?.user_id_1_email}
        </p>
        {reservation?.user_id_2_email && (
          <p>
            <strong>Co-pilot:</strong> {reservation?.user_id_2_email}
          </p>
        )}
        <p>
          <strong>From: </strong>
          {reservation?.fromDate} <strong>To: </strong>
          {reservation?.toDate}
        </p>
        <p>
          <strong>At: </strong>
          {reservation?.fromTime} <strong> Until:</strong>
          {reservation?.toTime}
        </p>
        <p>
          {" "}
          <strong>Plane model: </strong> {reservation?.plane_make}
        </p>
        {reservation?.instructor_name && (
          <p>
            {" "}
            <strong>Instructor: </strong>
            {reservation?.instructor_name}
          </p>
        )}

        <p>
          {" "}
          <strong>Activity: </strong>
          {reservation?.flighttype}{" "}
        </p>
        <p>
          {" "}
          <strong>Comments: </strong>
          {reservation?.comment}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingModal;
