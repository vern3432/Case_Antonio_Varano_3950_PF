import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../schedule/schedule.css";

// Creates the calendar for the plane reservation schedule
function Schedule() {
  const [reservationData, setReservationData] = useState();

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
        timeZone="America/New_York"
      />
    </div>
  );
}

export default Schedule;
