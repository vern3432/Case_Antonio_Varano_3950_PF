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
      <div>Year: {year} </div>
      <div>Model: {model}</div>
      <div>Tail Number: {tail_number} </div>
    </div>
  );
}

export default PlaneReservation;
