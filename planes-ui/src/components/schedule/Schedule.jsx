'use client'

import { useState, React } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../schedule/schedule.css";
import { useEffect } from "react";




// Creates the calendar for the plane reservation schedule
function Schedule() {
  const [reservations, setReservations] = useState(null);

  async function fetchReservations() {
    await fetch(`http://localhost:3001/get-reservations`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.log("Error fetching data: ", error));
  }

  useEffect(() => {

  });

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "event 1", date: "2023-12-11" },
          { title: "event 2", date: "2019-04-02" },
        ]}
      />
    </div>
  );
}

export default Schedule;
