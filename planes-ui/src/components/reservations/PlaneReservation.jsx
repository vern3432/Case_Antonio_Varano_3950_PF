import "./reservations.css";
import ReservationModal from "../modal/ReservationModal";

// Creates a PlaneReservation component with the plane image, year and model
// and a button that comes from the ReservationModal to reserve the plane
function PlaneReservation({ plane, year, model }) {
  return (
    <div className="plane-container m-2">
      <div>
        <ReservationModal model={model}></ReservationModal>
      </div>{" "}
      <img src={require(`./plane-images/${plane}`)}></img>
      <div>Year: {year} </div>
      <div>Model: {model}</div>
    </div>
  );
}

export default PlaneReservation;
