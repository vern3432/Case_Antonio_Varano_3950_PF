import "./reservations.css";
import ReservationModal from "../modal/ReservationModal";

// Creates a PlaneReservation component with the plane image, year and model
// and a button that comes from the ReservationModal to reserve the plane
function PlaneReservation({ plane, year, model, tail_number, id }) {
  return (
    <div className="plane-container m-2">
      <div>
        <ReservationModal tail_number={tail_number} id={id}></ReservationModal>
      </div>{" "}
      <img
        alt="text"
        id="reserverationsimages"
        src={require(`./plane-images/${plane}`)}
      ></img>
      <p>
        {" "}
        <strong>Year: </strong> {year}
      </p>
      <p>
        <strong>Model: </strong> {model}
      </p>
      <p>
        <strong>Tail Number: </strong> {tail_number}
      </p>
    </div>
  );
}

export default PlaneReservation;
