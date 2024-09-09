import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import data from "../../json/data.json";
import FilterAndSortSection from "./FilterAndSortSection";
import "mapbox-gl/dist/mapbox-gl.css";
import SearchSVG from "../SearchSVG";
import { LeftArrowSVG } from "../ArrowSVG";
import DragHandler from "./DragHandler";
import { getRightPadding, sideMenuNavigate } from "../../utils/utils";

const { allPins, middleLngLat, allPinKeys } = data;

const WrapperMapbox = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef([]);
  //
  const geolocateRef = useRef(null);
  const geoelRef = useRef(null);
  const geomarkerRef = useRef(null);
  const currentPosRef = useRef(null);
  console.log("rerender WrapperMapbox");

  const geolocateHandler = () => {
    if (geolocateRef.current) {
      geolocateRef.current.beforeTrigger();
      geolocateRef.current.trigger();
      console.log("trigger geolocation");
    }
  };

  useEffect(() => {
    console.log("reload map");
    mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

    window.mapRef = mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: middleLngLat, // starting position [lng, lat]
      zoom: 16, // starting zoom
      bearing: 20,
      style: "mapbox://styles/baoanhbui/cm0bz3vvj00qu01phchsjccal",
    });
    window.mapRef.on("dragstart", () => {
      window.setOpenCard(false);
    });
    geolocateRef.current = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
      showUserLocation: false,
      fitBoundsOptions: {
        zoom: 17,
        essential: true,
      },
    });
    geolocateRef.current.beforeTrigger = () => {};
    geolocateRef.current.on("geolocate", (pos) => {
      console.log("success");
      window.responsive.xs && window.openNav(false);
      const { latitude, longitude } = pos.coords;
      geoelRef.current.style.visibility = "visible";
      geomarkerRef.current.setLngLat([longitude, latitude]).addTo(mapRef.current);
      currentPosRef.current = { lng: longitude, lat: latitude };
    });
    mapRef.current.addControl(geolocateRef.current);
    geomarkerRef.current = new mapboxgl.Marker({
      element: geoelRef.current,
    });

    allPinKeys.forEach((pin) => {
      const { lnglat } = allPins[pin];
      new mapboxgl.Marker({
        element: markerRef.current[pin],
      })
        .setLngLat(lnglat)
        .addTo(mapRef.current);
    });

    return () => {};
  }, []);

  return (
    <>
      <nav>
        <NavMenu geolocateRef={geolocateRef} />
        <FilterAndSortSection
          markerRef={markerRef}
          currentPosRef={currentPosRef}
          drag={<DragHandler />}
          data={data}
        />
        <LocationCard data={data} markerRef={markerRef} />
      </nav>
      <div className="map-wrapper">
        <div ref={mapContainerRef} className="map-container"></div>
        <div
          ref={geoelRef}
          className="marker"
          style={{
            background: "yellow",
            visibility: "hidden",
          }}
        ></div>
      </div>
      <button className="geolocate" onClick={geolocateHandler}>
        Geolocate
      </button>
    </>
  );
};

function LocationCard({ data, markerRef }) {
  console.log("location card");
  const [pin, setPin] = useState(false);
  const [open, setOpen] = useState(false);
  const { allPins, allShowcases } = data;
  let events, showcases, pinIndex;
  if (pin) {
    ({ events, showcases } = allPins[pin]);
    ({ pinIndex } = allShowcases[showcases]);
  }
  window.setPinCard = (pin) => {
    setPin(pin);
  };
  window.setOpenCard = (open) => {
    setOpen(open);
  };
  return (
    <ul className={`locationcard ${open ? "open" : ""}`}>
      {pin && (
        <>
          <h3>
            <span>{pinIndex}</span> {showcases}
          </h3>
          {events.map(({ name, formattedDate, type, location, processedType }, i) => {
            return <li key={name + i}>{name}</li>;
          })}
          <button onClick={() => sideMenuNavigate(showcases, markerRef.current[pin])}>
            see more
          </button>
        </>
      )}
    </ul>
  );
}

function NavMenu({ geolocateRef }) {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const openHandler = (window.openNav = (open = true) => {
    geolocateRef.current.beforeTrigger = () => {
      geolocateRef.current.options.fitBoundsOptions.padding = {
        right: open ? getRightPadding() : 0,
      };
    };
    setOpen(open);
    open && window.setOpenCard(false);
  });
  window.closeSearch = () => {
    setOpenSearch(false);
  };
  console.log("open nav");
  return (
    <div className={`navigation ${open ? "open" : ""} ${openSearch ? "openSearch" : ""}`}>
      {open && (
        <button onClick={() => setOpenSearch(!openSearch)}>
          <SearchSVG />
        </button>
      )}
      <h1>People of Design Showcase Series</h1>
      <button onClick={() => (openSearch ? setOpenSearch(false) : openHandler(!open))}>
        <LeftArrowSVG />
      </button>
    </div>
  );
}

export default WrapperMapbox;
