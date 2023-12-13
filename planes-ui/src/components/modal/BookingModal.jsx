import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

// Creates the modal for the event in the schedule page
function BookingModal({ show, handleClose, reservation }) {
  const [user, setUser] = useState(null);

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
    userInfo.userId = userIdMatch ? userIdMatch[1] : null;

    return userInfo;
  };

  // Handle login form submission -> Navigate to new page on successful login
  const deleteReservation = async () => {
    try {
      const userCookie = getCookie('userName=');
      console.log(userCookie);

      if (userCookie) {
        // Extract the cookie info
        const userInfo = extractUserInfo(userCookie);
        setUser(userInfo.email);
      }

      console.log(user);
      console.log(reservation.user_id_1_email);

      if (user === reservation.user_id_1_email) {
        // Make a DELETE request to the server
        const response = await fetch(`http://localhost:3001/deleteReservation/${reservation.reservation_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed (e.g., authentication headers)
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message); // Output the success message from the server
        handleClose();
        window.location.reload();
      } else {
        alert("You do not have permission to delete this reservation.");
      }
    } catch (error) {
      console.error('Error:', error.message); // Output any errors that occurred
    }
  };

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

        <Button variant="danger" onClick={deleteReservation}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingModal;
