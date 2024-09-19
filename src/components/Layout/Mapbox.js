import React, { Fragment, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import data from "../../json/data.json";
import FilterAndSortSection from "./FilterAndSortSection";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchSVG, RightBtn, GeolocateSVG, RecenterSVG } from "../SVG";
import DragHandler from "./DragHandler";
import { getLeftPadding, getTopPadding, sideMenuNavigate } from "../../utils/utils";
import { Link } from "react-router-dom";
import { FormatType, FridayTag } from "./FilterAndSortComponents";
import PeopleofDesignShowcaseSeries from "../../json/Main/People of Design Showcase Series";

const { allPins, middleLngLat, allPinKeys, LngLatBounds } = data;

const WrapperMapbox = ({ children }) => {
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

  const recenterHandler = () => {
    mapRef.current.fitBounds(LngLatBounds, {
      essential: true,
      bearing: 20,
      padding: {
        left: (window.navIsOpen ? getLeftPadding() : 0) + 40,
        top: getTopPadding() + 40,
        bottom: 40,
        right: 40,
      },
    });
  };

  useEffect(() => {
    console.log("reload map");
    window.markerRef = markerRef;
    mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

    window.mapRef = mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: middleLngLat, // starting position [lng, lat]
      zoom: 16, // starting zoom
      bearing: 20,
      attributionControl: false,
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
      window.setAsideClass("havegeolocate");
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
        >
          <div className="intro">
            <PeopleofDesignShowcaseSeries />
            <Link to={"about"} className="readmore">
              ...Read more
            </Link>
          </div>
        </FilterAndSortSection>
        <LocationCard data={data} markerRef={markerRef}>
          <button className="geolocate" onClick={geolocateHandler}>
            <GeolocateSVG />
          </button>
          <FridayTag />
        </LocationCard>
        {children}
        <button className="recenter" onClick={recenterHandler}>
          <RecenterSVG />
        </button>
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
    </>
  );
};

function LocationCard({ data, markerRef, children }) {
  console.log("location card");
  const [pin, setPin] = useState(false);
  const [open, setOpen] = useState(false);
  const locationCardRef = useRef(null);
  const { allPins, allShowcases } = data;
  let events, showcases, pinIndex, formattedOrg, org;
  if (pin) {
    ({ events, showcases, formattedOrg, org } = allPins[pin]);
    ({ pinIndex } = allShowcases[showcases]);
  }
  useEffect(() => {
    window.setPinCard = (pin) => {
      setPin(pin);
    };
    window.setOpenCard = (open) => {
      setOpen(open);
    };
    window.locationCardRef = locationCardRef;
  }, []);
  return (
    <div ref={locationCardRef} className={`locationcard ${open ? "open" : ""}`}>
      {children}
      {pin && (
        <>
          <div className="title">
            <h3 className="showcasename">
              <span>{showcases}</span>
            </h3>
            <p className="organizer">
              with <Link to={`about/${org}`}>{formattedOrg}</Link>
            </p>
          </div>
          <ul>
            {events.map(({ name, formattedType }, i) => {
              return (
                <li key={`main${i}`}>
                  <h4>
                    - {name}
                    <span className="type">
                      , <FormatType formattedType={formattedType} />
                    </span>
                  </h4>
                </li>
              );
            })}
          </ul>
          <button
            className="togglebtn"
            onClick={() => sideMenuNavigate(showcases, markerRef.current[pin])}
          >
            see more
          </button>
        </>
      )}
    </div>
  );
}

function NavMenu({ geolocateRef }) {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    window.openNav = (open = true) => {
      window.navIsOpen = open;
      geolocateRef.current.beforeTrigger = () => {
        geolocateRef.current.options.fitBoundsOptions.padding = {
          left: open ? getLeftPadding() : 0,
          top: getTopPadding(),
        };
      };
      setOpen(open);
      open && window.setOpenCard(false);
    };
    window.closeSearch = () => {
      setOpenSearch(false);
    };
    window.openSearch = () => setOpenSearch(true);
    window.navRef = navRef;
  }, []);
  console.log("open nav");
  return (
    <div
      ref={navRef}
      className={`navigation ${open ? "open" : ""} ${openSearch ? "openSearch" : ""}`}
    >
      <button className={`leftbtn`} onClick={() => setOpenSearch(!openSearch)}></button>
      <Link className={`about`} to={`about`}>
        BB.B
      </Link>
      <button
        className={`${open ? "open" : ""} rightbtn`}
        onClick={() => (openSearch ? setOpenSearch(false) : window.openNav(!open))}
      ></button>
    </div>
  );
}

export default WrapperMapbox;
