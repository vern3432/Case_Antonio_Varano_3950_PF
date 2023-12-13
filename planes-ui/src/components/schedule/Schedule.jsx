import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../schedule/schedule.css";

// Creates the calendar for the plane reservation schedule
function Schedule() {
  const [reservationData, setReservationData] = useState();

  // Turn reservations into calendar events
  function createEvent(reservation) {
    const start = new Date(reservation.fromDate);
    start.setHours(reservation.fromTime.split(":")[0]);
    start.setMinutes(reservation.fromTime.split(":")[1]);

    const end = new Date(reservation.toDate);
    start.setHours(reservation.toTime.split(":")[0]);
    start.setMinutes(reservation.toTime.split(":")[1]);

    return {
      id: reservation.reservation_id,
      title: `${reservation.plane_model} reservation`,
      start,
      end,
      // Green for recreation events, blue for classes
      backgroundColor:
        reservation.flighttype === "Recreation" ? "#4BA432" : "#2597DD",
    };
  }

  // Get reservations
  useEffect(() => {
    async function fetchReservationData() {
      await fetch("http://localhost:3001/get-reservations")
        .then((response) => response.json())
        .then((reservations) => {
          const events = reservations.map((reservation) =>
            createEvent(reservation)
          );
          setReservationData(events);
        })
        .catch((error) => console.log("Error fetching data: ", error));
    }

    fetchReservationData();
  }, []);
  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={reservationData}
      />
    </div>
  );
}

export default Schedule;
