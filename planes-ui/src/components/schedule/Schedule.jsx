import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../schedule/schedule.css";

// Creates the calendar for the plane reservation schedule
function Schedule() {
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
