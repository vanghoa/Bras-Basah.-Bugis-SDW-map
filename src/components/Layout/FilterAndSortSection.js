import { Filter, Event, FigsMemo } from "./FilterAndSortComponents";
import Markers from "./Markers";
import { useState, useRef, Fragment, useMemo, useCallback, useEffect } from "react";
import { filterCheck, removeFig, scrollToEl } from "../../utils/utils";
import ShowcaseName from "./ShowcaseName";
import Img from "../../img/Img";

export default function FilterAndSortSection({ markerRef, currentPosRef, drag, data, children }) {
  const { allPlaces, allTypes, allShowcaseKeys, allTimes } = data;
  const [filter, setFilter] = useState(null);
  const [asideClass, setAsideClass] = useState("");
  const showcaseRef = useRef(null);
  const searchsttRef = useRef(null);
  const pinlistRef = useRef({});
  console.log("filter: ", filter);
  const filterHandler = useCallback((v) => {
    setFilter(v);
    window.closeSearch();
    scrollToEl(showcaseRef.current);
  }, []);
  const directionHandler = useCallback(async ([lng, lat]) => {
    removeFig();
    const map = window.mapRef;
    if (!map || !currentPosRef.current) {
      return;
    }
    console.log("once");
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${currentPosRef.current.lng},${currentPosRef.current.lat};${lng},${lat}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
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
  }, []);
  useEffect(() => {
    console.log("reload filterandsortsection");
    window.filterHandler = filterHandler;
    window.searchsttRef = searchsttRef;
    window.setAsideClass = setAsideClass;
    //window.directionHandler = directionHandler;
    window.pinlistRef = pinlistRef;
  }, []);
  //
  return (
    <aside className={`filterandsortclass ${filter == null ? "" : "havefilter"} ${asideClass}`}>
      <Markers markerRef={markerRef} filter={filter} data={data} />
      <div className="rightpanel">
        {drag}
        <div className="searchwrapper">
          <ul className="searchlist">
            <Filter fn={filterHandler} obj={allPlaces} current={filter}>
              LOCATION
            </Filter>
            <Filter fn={filterHandler} obj={allTimes} current={filter}>
              DATE
            </Filter>
            <Filter fn={filterHandler} obj={allTypes} current={filter}>
              TYPE OF EVENT
            </Filter>
          </ul>
          <button className="background" onClick={() => window.closeSearch()}></button>
        </div>
        <div
          className={`content`}
          ref={(el) => {
            window.contentRef = el;
          }}
        >
          {children}
          <ul className={`showcaselist`} ref={showcaseRef}>
            <div className="searchstatus" ref={searchsttRef} onClick={() => window.openSearch()}>
              <span>Showing events:</span>
              <div className="status togglebtn checked">
                <span>{(allPlaces[filter] || allTypes[filter] || allTimes[filter])?.name}</span>
                <button
                  className="xbtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    filterHandler(null);
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
            {allShowcaseKeys.map((showcase, i) => {
              return (
                <ShowcaseItem
                  key={showcase + i}
                  data={data}
                  directionHandler={directionHandler}
                  markerRef={markerRef}
                  filter={filter}
                  showcase={showcase}
                  pinlistRef={pinlistRef}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function ShowcaseItem({ showcase, filter, markerRef, directionHandler, data, pinlistRef }) {
  const { allShowcases } = data;
  const local = useRef({ ref: null, count: 0 });
  const [open, setOpen] = useState(false);
  const firstOpen = useRef(false);
  useEffect(() => {
    window.openAccordion
      ? (window.openAccordion[showcase] = setOpen)
      : (window.openAccordion = { [showcase]: setOpen });
  }, []);

  useEffect(() => {
    open == false && (firstOpen.current = true);
    const cur = local.current;
    if (cur.ref && !open && cur.count > 0) {
      cur.ref.classList.add("hidefig");
      cur.ref.onanimationend = (event) => {
        cur.ref.classList.remove("hidefig");
        cur.ref.onanimationend = null;
      };
    }
    cur.count++;
  }, [open]);
  const { pins, processedType, processedLocation, pinIndex, lastDate } = allShowcases[showcase];
  return (
    <li
      ref={(ref) => {
        pinlistRef.current[showcase] = ref;
        local.current.ref = ref;
      }}
      className={`pinlist ${filterCheck(filter, processedType, undefined, processedLocation, [
        lastDate,
        null,
      ])} ${open ? "open" : ""}`}
    >
      <h3
        className="showcasename"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div
          className="actualheight"
          ref={(el) => {
            pins.forEach((pin) => {
              if (!markerRef.current[pin]) {
                return;
              }
              markerRef.current[pin].h3 = el;
            });
          }}
        ></div>
        <span className="index">{pinIndex}</span>
        <ShowcaseName isLow={false} name={showcase} />
        {firstOpen.current && <FigsMemo showcase={showcase} />}
      </h3>
      <div className="eventlistwrapper">
        <div className="gridtogglewrapper">
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
      <div className="linebelow"></div>
    </li>
  );
}

function EventList({ markerRef, filter, pin, directionHandler, data }) {
  const { allTypes, allPins, allPlaces } = data;
  const { events, lnglat, processedType, location, showcases, lastDate } = allPins[pin];
  return (
    <ul
      className={`eventlist ${filterCheck(filter, processedType, location, null, [
        lastDate,
        null,
      ])}`}
      ref={(el) => {
        if (!markerRef.current[pin]) {
          return;
        }
        markerRef.current[pin].anchor = el;
      }}
    >
      {events.map((event, i) => {
        return (
          <Event
            key={i}
            event={event}
            markerRef={markerRef}
            directionHandler={() => lnglat && directionHandler(lnglat)}
            filter={filter}
          ></Event>
        );
      })}
    </ul>
  );
}
