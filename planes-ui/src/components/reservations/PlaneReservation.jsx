import "./reservations.css";
import ReservationModal from "../modal/ReservationModal";

// Creates a PlaneReservation component with the plane image, year and model
// and a button that comes from the ReservationModal to reserve the plane
function PlaneReservation({ plane, year, model, tail_number, id }) {
  return (

    <div className="plane-container m-2">

      <div>
        <ReservationModal model={model} id={id}></ReservationModal>
      </div>{" "}
      <img src={require(`./plane-images/${plane}`)}></img>
      <p>Year: {year}</p>
      <p><strong>Model: </strong> {model}</p>
      <p><strong>Tail Number: </strong> {tail_number}</p>
    </div>
  );
}

export default PlaneReservation;
