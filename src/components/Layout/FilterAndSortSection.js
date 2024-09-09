import { Filter, Event } from "./FilterAndSortComponents";
import Markers from "./Markers";
import { useState, useRef, Fragment, useMemo } from "react";
import { filterCheck } from "../../utils/utils";

export default function FilterAndSortSection({ markerRef, currentPosRef, drag, data }) {
  const { allPlaces, allTypes, allShowcaseKeys } = data;
  const [filter, setFilter] = useState(null);
  console.log("filter: ", filter);
  const filterHandler = (v) => {
    setFilter(v);
    window.closeSearch();
  };
  //
  const directionHandler = async ([lng, lat]) => {
    const map = window.mapRef;
    if (!map || !currentPosRef.current) {
      return;
    }
    console.log("once");
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosRef.current.lng},${currentPosRef.current.lat};${lng},${lat}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    console.log(route);
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    } else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };
  return (
    <aside className={`filterandsortclass`}>
      {drag}
      <Markers markerRef={markerRef} filter={filter} data={data} />
      <div className="rightpanel">
        <SearchScreen>
          {
            <div className="searchstatus" onClick={() => filterHandler(null)}>
              {filter}
            </div>
          }
          <div className="search">
            <Filter fn={filterHandler} obj={allPlaces} current={filter} />
            <Filter fn={filterHandler} obj={allTypes} current={filter} />
          </div>
          <button className="background" onClick={() => window.closeSearch()}></button>
        </SearchScreen>
        <div className={`content  ${filter == null ? "" : "havefilter"}`}>
          <ul className={`showcaselist`}>
            {allShowcaseKeys.map((showcase, i) => {
              return (
                <ShowcaseItem
                  key={showcase + i}
                  data={data}
                  directionHandler={directionHandler}
                  markerRef={markerRef}
                  filter={filter}
                  showcase={showcase}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function SearchScreen({ children }) {
  return <div className="searchwrapper">{children}</div>;
}

function ShowcaseItem({ showcase, filter, markerRef, directionHandler, data }) {
  const { allShowcases } = data;
  const [open, setOpen] = useState(false);
  window.openAccordion
    ? (window.openAccordion[showcase] = setOpen)
    : (window.openAccordion = { [showcase]: setOpen });
  const { pins, processedType, processedLocation, pinIndex } = allShowcases[showcase];
  return (
    <li
      className={`pinlist ${filterCheck(filter, processedType, undefined, processedLocation)} ${
        open ? "open" : ""
      }`}
    >
      <h3
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span>{pinIndex}</span> {showcase}
      </h3>
      <div className="eventlistwrapper">
        <div>
          {pins.map((pin, i) => {
            return (
              <EventList
                key={pin + i}
                markerRef={markerRef}
                filter={filter}
                pin={pin}
                directionHandler={directionHandler}
                data={data}
                open={open}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}

function EventList({ markerRef, filter, pin, directionHandler, data }) {
  const { allTypes, allPins, allPlaces } = data;
  const { events, lnglat, processedType, location, showcases } = allPins[pin];
  return (
    <ul
      className={`eventlist ${filterCheck(filter, processedType, location)}`}
      ref={(el) => {
        if (!markerRef.current[pin]) {
          return;
        }
        markerRef.current[pin].anchor = el;
      }}
    >
      {events.map(({ name, formattedDate, type, location, processedType, long }, i) => {
        return (
          <Event
            key={name + i}
            name={name}
            date={formattedDate}
            lnglat={lnglat}
            pin={pin}
            markerRef={markerRef}
            directionHandler={() => lnglat && directionHandler(lnglat)}
            formattedType={type.map((type_, i) => {
              return (
                <Fragment key={type_ + i}>
                  {allTypes[type_].name}
                  {i + 1 == type.length ? `.` : i + 1 == type.length - 1 ? ` and ` : " , "}
                </Fragment>
              );
            })}
            formattedPlace={allPlaces[location].name}
            className={filterCheck(filter, processedType, location)}
            showcases={showcases}
            long={long}
          ></Event>
        );
      })}
    </ul>
  );
}
