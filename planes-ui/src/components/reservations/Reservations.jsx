import React, { useEffect, useState } from "react";
import "./reservations.css";
import PlaneReservation from "./PlaneReservation";

// displays all planes from the plane table on the reservation page with the plane image, year and model
function Reservations() {
  const [planeData, setPlaneData] = useState([]);

  useEffect(() => {
    async function fetchPlaneData() {
      await fetch("http://localhost:3001/get-planes")
        .then((response) => response.json())
        .then((data) => setPlaneData(data));

    }

    fetchPlaneData();
  }, []);

  return (
    <div className="reservation-container container-fluid">
      {planeData.map((plane) => (
        <PlaneReservation
          key={plane.plane_id}
          id={plane.plane_id}
          plane={plane.img_src}
          year={plane.Year}
          model={plane.model}
          tail_number={plane.tail_number}
        ></PlaneReservation>
      ))}
    </div>
  );
}

export default Reservations;
