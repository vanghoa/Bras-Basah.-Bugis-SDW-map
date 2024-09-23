import { useState, useContext, Fragment, memo, useMemo } from "react";
import { allInOneMapNavigate, filterCheck } from "../../utils/utils";
import { Link } from "react-router-dom";
import Img, { ImgShowcaseName } from "../../img/Img";

export function Filter({ fn, obj, current, children }) {
  const arr = Object.keys(obj);
  return (
    <li>
      <h3>{children}</h3>
      <div className="labellist">
        {arr.map((v, i) => {
          return (
            <label key={i} className={`togglebtn ${current === v ? "checked" : ""}`}>
              <input
                type="checkbox"
                checked={current === v}
                onChange={() => {
                  fn(v === current ? null : v);
                }}
              />
              {obj[v].name}
              <div className="xbtn">&times;</div>
            </label>
          );
        })}
      </div>
    </li>
  );
}

const fridaytimestamp = new Date("09/27/2024").setHours(0, 0, 0, 0);

export function Event({ markerRef, directionHandler, filter, event }) {
  const { name, location, processedType, friday, lastDate } = event;
  const mainfilter = filterCheck(filter, processedType, location, null, [lastDate, null]);
  const fridayfilter = friday
    ? filterCheck(filter, friday.processedType, location, null, [null, fridaytimestamp])
    : "";
  const props = useMemo(() => ({ event, markerRef, directionHandler }), []);
  return (
    <>
      <li className={`mainevent ${mainfilter} ${fridayfilter}`}>
        <h4>{name}</h4>
        <div className={`${mainfilter} innerinfo`}>
          <MainMemo props={props} />
        </div>
        {friday && (
          <div className={`friday ${fridayfilter}`}>
            <FridayMemo props={props} />
          </div>
        )}
      </li>
    </>
  );
}

const FormatType = memo(function FormatType({ formattedType }) {
  return formattedType.map((str, i) => {
    return (
      <Fragment key={str + i}>
        {str}
        {i + 1 == formattedType.length ? `` : i + 1 == formattedType.length - 1 ? ` and ` : " , "}
      </Fragment>
    );
  });
});

const MainMemo = memo(function ({
  props: { event, markerRef, directionHandler, pathname = "events" },
}) {
  const {
    formattedDate,
    formattedType,
    formattedLocation,
    showcases,
    long,
    short,
    ggmap,
    lnglat,
    pinName,
  } = event;
  return (
    <>
      <div className="small">
        <p>
          <FormatType formattedType={formattedType} />
        </p>
        <FormatDate>{formattedDate}</FormatDate>
        <p>{formattedLocation}</p>
      </div>
      <p className="short">
        {short}{" "}
        <Link className="readmore" to={`${pathname}/${long}`}>
          ...Read more
        </Link>
      </p>
      <div className="buttons">
        <button
          className="togglebtn"
          onClick={() =>
            allInOneMapNavigate(lnglat, markerRef.current[pinName], pinName, showcases)
          }
        >
          View on this map
        </button>
        <a href={ggmap} target="_blank" rel="noreferrer" className="togglebtn">
          Google Map &nbsp;&#8599;&#xFE0E;
        </a>
        {/*<button className="togglebtn geolocate" onClick={directionHandler}>
          Walking Directions
        </button>*/}
      </div>
    </>
  );
});

export const FridayTag = () => (
  <button
    className="fridaytag"
    onClick={() => {
      window.openNav(true);
      window.filterHandler("fri");
    }}
  >
    <span>
      Friday<br></br>Late
    </span>
  </button>
);

const FridayMemo = memo(function ({ props: { event, markerRef, directionHandler } }) {
  const { formattedLocation, showcases, long, friday, ggmap, lnglat, pinName } = event;
  return (
    <>
      <FridayTag />
      <div className="branch"></div>
      <h4>{friday.name}</h4>
      <div className="innerinfo">
        <MainMemo
          props={{
            event: {
              long,
              formattedLocation,
              showcases,
              ggmap,
              short: "",
              lnglat,
              pinName,
              ...friday,
            },
            markerRef,
            directionHandler,
            pathname: "friday",
          }}
        />
      </div>
    </>
  );
});

export const Fig = ({ src }) => {
  return (
    <div
      className={`fig`}
      style={{
        "--de": `${(Math.random() * 0.49 + 0.01).toFixed(2)}s`,
        "--du": `${(Math.random() * 0.5 + 0.7).toFixed(2)}s`,
        "--r1": `-${(Math.random() * 200 + 10).toFixed(2)}deg`,
        "--r2": `${(Math.random() * 240 + 10).toFixed(2)}deg`,
      }}
    >
      <div className="figcanvas">
        <ImgShowcaseName src={`${src}`} />
      </div>
    </div>
  );
};

export const FigsMemo = memo(function ({ showcase }) {
  return (
    <div className="figs">
      {Array.from({ length: 7 }, (v, i) => (
        <Fig key={i} src={`${showcase}${i + 1}`} />
      ))}
    </div>
  );
});

export const FormatDate = ({ children }) => (
  <div className="date">
    {children.split("\n").map((str, i) => (
      <p key={i}>{str}</p>
    ))}
  </div>
);

export { FormatType };
