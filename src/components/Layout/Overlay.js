import { Link, useParams, Navigate } from "react-router-dom";
import { RightBtn } from "../SVG";
import Main from "../../json/Main";
import Friday from "../../json/Friday";
import data from "../../json/data.json";
import { FormatType } from "./FilterAndSortComponents";
import { allInOneMapNavigate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
const { allEvents, longQuery } = data;

export default function Overlay({ children }) {
  return (
    <div className="overlay">
      <div className="content">{children}</div>
      <Link className="toHome" to={"/"} />
      <RightBtn className="open" />
    </div>
  );
}

export function FridayOverlay() {
  const { name } = useParams();
  const event = allEvents[longQuery[name]];
  const { formattedLocation, showcases, friday, ggmap, lnglat, pinName } = event;
  return (
    <EventContent
      event={{ formattedLocation, showcases, ggmap, lnglat, pinName, ...friday }}
      pathname={name}
      longObj={Friday}
    />
  );
}

const EventContent = ({ event, pathname, longObj }) => {
  const navigate = useNavigate();
  const {
    name,
    formattedDate,
    formattedType,
    formattedLocation,
    ggmap,
    lnglat,
    pinName,
    showcases,
  } = event;
  return pathname in longObj ? (
    <Overlay>
      <h4>{name}</h4>
      <div className="small">
        <p>
          <FormatType formattedType={formattedType} />
        </p>
        <p className="date">{formattedDate}</p>
        <p>{formattedLocation}</p>
      </div>
      <div className="buttons">
        <button
          className="togglebtn"
          onClick={() => {
            navigate("/");
            console.log(pinName);
            allInOneMapNavigate(lnglat, window.markerRef.current[pinName], pinName, showcases);
          }}
        >
          View on this map
        </button>
        <a href={ggmap} target="_blank" rel="noreferrer" className="togglebtn">
          Google Map &nbsp;&#8599;&#xFE0E;
        </a>
        <button className="togglebtn geolocate" onClick={window.directionHandler}>
          Directions
        </button>
      </div>
      <div className="long">{longObj[pathname]()}</div>
    </Overlay>
  ) : (
    <Navigate to="/" replace />
  );
};

export function EventsOverlay() {
  const { name } = useParams();
  const event = allEvents[longQuery[name]];
  return <EventContent event={event} pathname={name} longObj={Main} />;
}
