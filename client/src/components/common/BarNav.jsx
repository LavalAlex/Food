import { Link } from "react-router-dom";
import "../../styles/NavRadio.css";

export default function RenderNavBar({ nav }) {
  var checked1 = "";
  var checked2 = "";
  var checked3 = "";

  if (nav === "1") checked1 = "true";
  if (nav === "2") checked2 = "true";
  if (nav === "3") checked3 = "true";

  return (
    <div className="conteiner-radio">
      <div className="companent-radio">
        <div className="tabs">
          <Link to="/createrecipes/">
            <input
              type="radio"
              name="radio1"
              checked={checked1}
              value="3"
              id="tab-1"
            />
            <label for="tab-1" className="tab_1">
              <p>Create recipes</p>
            </label>
          </Link>
          <Link to="/home/">
            <input
              type="radio"
              name="radio1"
              value="4"
              checked={checked2}
              id="tab-2"
            />
            <label for="tab-2" className="tab_2">
              <p>Home</p>
            </label>
          </Link>
          <Link to="/details/">
            <input
              type="radio"
              name="radio1"
              value="5"
              checked={checked3}
              id="tab-3"
            />
            <label for="tab-3" className="tab_3">
              <p>Details</p>
            </label>{" "}
          </Link>
          <div className="tab-color"></div>
        </div>
      </div>
    </div>
  );
}
