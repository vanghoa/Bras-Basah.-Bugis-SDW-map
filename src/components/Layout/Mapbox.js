import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import data from "../../json/data.json";
import FilterAndSortSection from "./FilterAndSortSection";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchSVG, RightBtn, GeolocateSVG, RecenterSVG } from "../SVG";
import DragHandler from "./DragHandler";
import {
  closeAllOverlays,
  getBottomPadding,
  getLeftPadding,
  getTopPadding,
  isTouchScreen,
  removeFig,
  sideMenuNavigate,
  throttle,
} from "../../utils/utils";
import { Link } from "react-router-dom";
import { Fig, FormatType, FridayTag, FridayTagLocation } from "./FilterAndSortComponents";
import PeopleofDesignShowcaseSeries from "../../json/Main/People of Design Showcase Series";
import ShowcaseName from "./ShowcaseName";
import Img, { allImg, allImgs } from "../../img/Img";

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
      if (geoelRef.current?.classList.contains("showfig")) {
        geoelRef.current.onanimationend = (event) => {
          geoelRef.current.classList.remove("showfig", "hidefig");
          geoelRef.current.onanimationend = null;
        };
        geoelRef.current.classList.add("hidefig");
      }
    }
  };

  const recenterHandler = () => {
    removeFig();
    window.setOpenCard(false);
    mapRef.current.fitBounds(LngLatBounds, {
      essential: true,
      bearing: 20,
      padding: {
        left: (window.navIsOpen ? getLeftPadding() : 0) + 40,
        top: getTopPadding() + 40,
        bottom: 40,
        right: 60,
      },
    });
  };

  useEffect(() => {
    console.log("reload map");
    window.markerRef = markerRef;
    window.geoelRef = geoelRef;
    mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      bounds: LngLatBounds,
      //center: middleLngLat, // starting position [lng, lat]
      //zoom: 16, // starting zoom
      attributionControl: false,
      style: "mapbox://styles/baoanhbui/cm0bz3vvj00qu01phchsjccal",
      fitBoundsOptions: {
        bearing: 20,
        padding: {
          left: 40,
          top: 96,
          bottom: 40,
          right: 60,
        },
      },
    });
    window.mapRef = mapRef;
    window.mapElRef = mapContainerRef;
    mapRef.current.on("dragstart", closeAllOverlays);
    !isTouchScreen() && mapRef.current.on("wheel", throttle(closeAllOverlays));
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
      removeFig();
      window.setOpenCard(false);
      window.responsive.xs && window.openNav(false);
      const { latitude, longitude } = pos.coords;
      geoelRef.current.style.visibility = "visible";
      geomarkerRef.current.setLngLat([longitude, latitude]).addTo(mapRef.current);
      currentPosRef.current = { lng: longitude, lat: latitude };
      window.setAsideClass("havegeolocate");
      mapRef.current.once("moveend", () => {
        geoelRef.current.classList.add("showfig");
      });
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
          className="geolocatemarker"
          style={{
            visibility: "hidden",
          }}
        >
          <div className="fig">
            <Img
              src={Object.keys(allImgs)[Math.floor(Math.random() * Object.keys(allImgs).length)]}
            />
          </div>
        </div>
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
  let events, showcases, pinIndex, formattedOrg, org, formattedLocation;
  if (pin) {
    ({ events, showcases, formattedOrg, org } = allPins[pin]);
    ({ formattedLocation } = events[0]);
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
              <ShowcaseName name={showcases} />
            </h3>
            <div className="info">
              <p>
                with <Link to={`about/${org}`}>{formattedOrg}</Link>
              </p>
            </div>
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
            See more
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
      <div className="logoloadingwrapper">
        <div className="logoloading">
          <ShowcaseName className="row" name={`BRAS `} />
          <span className="row">
            <ShowcaseName name={`BASAH`} />
            <span className="dot">.</span>
          </span>
          <ShowcaseName className="row" name={`BUGIS`} />
        </div>
        <div className="designdistrict">
          <ShowcaseName className="des" name={`\u200bDESIGN `} />
          <ShowcaseName className="dist" name={`\u200bDISTRICT`} />
        </div>
      </div>
      <div className="landing">
        <NavMenuMemo />
        <button
          className={`${open ? "open" : ""} rightbtn`}
          onClick={() => (openSearch ? setOpenSearch(false) : window.openNav(!open))}
        ></button>
      </div>
    </div>
  );
}

const NavMenuMemo = memo(function () {
  const imgArr = Object.keys(allImgs)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);
  return (
    <>
      <Link className={`about`} to={`about`}>
        BB.B
      </Link>
      <div className="figswrapper">
        {/*<div className="figs">
          {imgArr.map((src, i) => {
            return (
              <div className="fig" key={i}>
                <Img src={`${src}`} />
              </div>
            );
          })}
        </div>*/}
      </div>
    </>
  );
});

export default WrapperMapbox;
