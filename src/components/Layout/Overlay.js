import { Link, useParams, Navigate } from "react-router-dom";
import { RightBtn } from "../SVG";
import Main from "../../json/Main";
import Friday from "../../json/Friday";
import data from "../../json/data.json";
import { FormatDate, FormatType } from "./FilterAndSortComponents";
import { allInOneMapNavigate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
const { allEvents, longQuery } = data;

export default function Overlay({ children, contentRef }) {
  return (
    <div className="overlay">
      <div className="content" ref={contentRef}>
        {children}
      </div>
      <Link className="toHome" to={"/"} />
      <RightBtn className="open" />
    </div>
  );
}

export function FridayOverlay() {
  const { name } = useParams();
  const event = allEvents[longQuery[name]];
  const { formattedLocation, showcases, friday, ggmap, lnglat, pinName, formattedOrg, org } = event;
  return (
    <EventContent
      event={{ formattedLocation, showcases, ggmap, lnglat, pinName, formattedOrg, org, ...friday }}
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
    formattedOrg,
    org,
    regis = null,
  } = event;
  const LongComponent = longObj[pathname];
  return pathname in longObj ? (
    <Overlay>
      <div className="title">
        <h4>{name}</h4>
        <p className="organizer">
          with{" "}
          {org ? <Link to={`/about/${org}`}>{formattedOrg}</Link> : <span>{formattedOrg}</span>}
        </p>
      </div>
      <div className="small">
        <p>
          <FormatType formattedType={formattedType} />
        </p>
        <FormatDate>{formattedDate}</FormatDate>
        <p>{formattedLocation}</p>
        {regis && (
          <p>
            Register here:{` `}
            <a href={`https://${regis}`} target="_blank">
              {regis}
            </a>
          </p>
        )}
      </div>
      <div className="long">
        <LongComponent>
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
          </div>
        </LongComponent>
      </div>
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
