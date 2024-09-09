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

export function Event({
  name,
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
