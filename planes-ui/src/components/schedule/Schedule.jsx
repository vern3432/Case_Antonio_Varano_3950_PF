import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../schedule/schedule.css";
import BookingModal from "../modal/BookingModal";

// Creates the calendar for the plane reservation schedule
function Schedule() {
  const [reservationData, setReservationData] = useState();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  // Turn reservations into calendar events
  function createEvent(reservation) {
    // Assuming fromDate, toDate, fromTime, and toTime are provided in UTC format
    const start = new Date(`${reservation.fromDate}T${reservation.fromTime}Z`);
    const end = new Date(`${reservation.toDate}T${reservation.toTime}Z`);

    // Adjust dates to EST
    start.setUTCHours(start.getUTCHours() - 5); // UTC to EST offset is -5 hours
    end.setUTCHours(end.getUTCHours() - 5);

    return {
      id: reservation.reservation_id,
      title: `${reservation.plane_model} reservation`,
      start,
      end,
      backgroundColor:
        reservation.flighttype === "Recreation" ? "#4BA432" : "#2597DD",
      url: "#" + reservation.reservation_id,
    };
  }

  // Get reservations
  useEffect(() => {
    async function fetchReservationData() {
      await fetch("http://localhost:3001/get-reservations")
        .then((response) => response.json())
        .then((reservations) => {
          setReservationData(reservations);
        })
        .catch((error) => console.log("Error fetching data: ", error));
    }

    fetchReservationData();
  }, []);

  // Show the modal for the event in the schedule page if the URL changes with the id number
  useEffect(() => {
    if (location.hash != "") {
      setShowModal(true);
    }
  }, [location]);
  return (
    <div className="calendar">
      <BookingModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          window.location.hash = "";
        }}
        reservation={
          reservationData?.filter(
            (x) => "#" + x.reservation_id == location.hash
          )[0]
        }
      ></BookingModal>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={reservationData?.map((reservation) => createEvent(reservation))}
        timeZone="America/New_York"
      />
    </div>
  );
}

export default Schedule;
