import "./reservations.css";
import Button from "react-bootstrap/Button";

// Creates a plane reservation component with the plane image, year and model and a button to reserve the plane
function PlaneReservation({ plane, year, model }) {
  return (
    <div className="plane-container m-2">
      <Button className="m-2" variant="primary">
        Reserve
      </Button>{" "}
      <img src={require(`./plane-images/${plane}`)}></img>
      <div>Year: {year} </div>
      <div>Model: {model}</div>
    </div>
  );
}

export default PlaneReservation;
