import { useState, useContext, Fragment } from "react";
import { allInOneMapNavigate } from "../../utils/utils";
import { Link } from "react-router-dom";

export function Filter({ fn, obj, current }) {
  const arr = Object.keys(obj);
  return (
    <div>
      {arr.map((v, i) => {
        return (
          <label key={i}>
            <input
              type="checkbox"
              checked={current === v}
              onChange={() => {
                fn(current === v ? null : v);
              }}
            />
            {obj[v].name}
          </label>
        );
      })}
    </div>
  );
}

const fridaytimestamp = new Date("09/27/2024").setHours(0, 0, 0, 0);

export function Event({ lnglat, pin, markerRef, directionHandler, filter, event }) {
  const { name, location, processedType, friday, lastDate } = event;
  const mainfilter = filterCheck(filter, processedType, location, null, [lastDate, null]);
  const fridayfilter = friday
    ? filterCheck(filter, friday.processedType, location, null, [null, fridaytimestamp])
    : "";
  const props = useMemo(() => ({ event, lnglat, markerRef, pin, directionHandler }), []);
  return (
    <>
      <li className={`mainevent ${mainfilter} ${fridayfilter}`}>
        <h4>{name}</h4>
        <div className="innercontent">
          <div className={`${mainfilter} innerinfo`}>
            <MainMemo props={props} />
          </div>
          {friday && (
            <div className={`friday ${fridayfilter}`}>
              <FridayMemo props={props} />
            </div>
          )}
        </div>
      </li>
    </>
  );
}

const FormatType = memo(function FormatType({ formattedType }) {
  return formattedType.map((str, i) => {
    return (
      <Fragment key={str + i}>
        {str}
        {i + 1 == formattedType.length ? `.` : i + 1 == formattedType.length - 1 ? ` and ` : " , "}
      </Fragment>
    );
  });
});

const MainMemo = memo(function ({ props: { event, lnglat, markerRef, pin, directionHandler } }) {
  const { formattedDate, formattedType, formattedLocation, showcases, long, short } = event;
  return (
    <>
      <div className="small">
        <p>
          <FormatType formattedType={formattedType} />
        </p>
        <p className="date">{formattedDate}</p>
        <p>{formattedLocation}</p>
      </div>
      <p className="short">
        {short} <Link to={`events/${long}`}>...Read more</Link>
      </p>
      <div className="button">
        <button onClick={() => allInOneMapNavigate(lnglat, markerRef.current[pin], pin, showcases)}>
          View on this map
        </button>
        <button onClick={directionHandler}>go here</button>
      </div>
    </>
  );
});

const FridayMemo = memo(function ({ props: { event, lnglat, markerRef, pin, directionHandler } }) {
  const { formattedLocation, showcases, long, friday } = event;
  return (
    <>
      <div className="branch"></div>
      <h4>{friday.name}</h4>
      <div className="innerinfo">
        <MainMemo props={{friday, lnglat, markerRef, pin, directionHandler}}/>
        <div className="small">
          <p>
            <FormatType formattedType={friday.formattedType} />
          </p>
          <p className="date">{friday.formattedDate}</p>
          <p>{formattedLocation}</p>
        </div>
        <p className="short">
          <Link to={`friday/${long}`}>...Read more</Link>
        </p>
        <div className="button">
          <button
            onClick={() => allInOneMapNavigate(lnglat, markerRef.current[pin], pin, showcases)}
          >
            View on this map
          </button>
          <button onClick={directionHandler}>go here</button>
        </div>
      </div>
    </>
  );
});

const InnerInfo = ({
  formattedType,
  formattedDate,
  lnglat,
  pin,
  markerRef,
  directionHandler,
  formattedType,
  formattedPlace,
  className,
  showcases,
  long,
}) {
  return (
    <li className={`indivevent ${className}`}>
      <h4>{name}</h4>
      <button onClick={() => allInOneMapNavigate(lnglat, markerRef.current[pin], pin, showcases)}>
        flyto
      </button>
      <button onClick={directionHandler}>go here</button>
      <Link to={`events/${long}`}>...Read more</Link>
      <p>{formattedType}</p>
      <p>{formattedDate}</p>
      <p>{formattedPlace}</p>
    </li>
  );
}
