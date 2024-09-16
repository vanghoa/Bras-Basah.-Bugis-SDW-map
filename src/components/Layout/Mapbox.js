import React, { Fragment, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import data from "../../json/data.json";
import FilterAndSortSection from "./FilterAndSortSection";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchSVG, RightBtn, GeolocateSVG } from "../SVG";
import DragHandler from "./DragHandler";
import { getLeftPadding, sideMenuNavigate } from "../../utils/utils";
import { Link } from "react-router-dom";

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
    window.markerRef = markerRef;
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
            <h1 className="fdisp">
              PEOPLE OF <br></br>DESIGN<br></br>SHOWCASE<br></br>SERIES
            </h1>
            <p>
              During Singapore Design Week 2024, ten showcases presented across the Bras Basah.Bugis
              Design District will creatively examine the rituals of daily life through the lens of
              design. Challenging the mundane, each showcase delves into a specific activity such as
              Eat, Sleep, Shop, Read, Heal, Make, Plant, Commute, Display and Design. Through new
              works and collaborative projects, visitors will discover imaginative design
              possibilities shaped to offer fresh perspectives on the world around us, inspiring new
              ways of thinking, seeing, and experiencing daily life.
            </p>
            <p>
              The People of Design showcases are led by Hans Tan, together with a team of
              designer-curators from Atelier Fang, Atelier HOKO, Forest and Whale, gideon-jamie,
              J.A.B.O.C (Just A Band of Creatives), “brief.”, Studio Juju and Yishun Health.
            </p>
          </div>
        </FilterAndSortSection>
        <LocationCard data={data} markerRef={markerRef}>
          <button className="geolocate" onClick={geolocateHandler}>
            <GeolocateSVG />
          </button>
        </LocationCard>
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
    <div className={`locationcard ${open ? "open" : ""}`}>
      {children}
      {pin && (
        <>
          <h3 className="showcasename smallshowcasename">
            <span>{showcases}</span>
          </h3>
          {events.map(({ name, formattedDate, type, location, processedType, friday }, i) => {
            return (
              <Fragment key={`main${i}`}>
                <h4>{name}</h4>
                {friday && (
                  <h4 className="friday">
                    <div className="branch"></div>
                    {friday.name}
                  </h4>
                )}
              </Fragment>
            );
          })}
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
  useEffect(() => {
    window.openNav = (open = true) => {
      geolocateRef.current.beforeTrigger = () => {
        geolocateRef.current.options.fitBoundsOptions.padding = {
          left: open ? getLeftPadding() : 0,
        };
      };
      setOpen(open);
      open && window.setOpenCard(false);
    };
    window.closeSearch = () => {
      setOpenSearch(false);
    };
    window.openSearch = () => setOpenSearch(true);
  }, []);
  console.log("open nav");
  return (
    <div className={`navigation ${open ? "open" : ""} ${openSearch ? "openSearch" : ""}`}>
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
