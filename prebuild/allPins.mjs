import { allEvents, longQuery } from "./allEvents.mjs";
import { allPlaces } from "./allPlaces.mjs";
import { getLaterDate } from "./functions.mjs";
import mapboxgl from "mapbox-gl";

const pinNames = [
  "read",
  "eat1",
  "eat2",
  "shop1",
  "shop2",
  "heal",
  "sleep",
  "commute",
  "plant",
  "display",
  "make",
  "design",
];

const allShowcases = {};

const allPins = pinNames.reduce((acc, pinName, i) => {
  const events = allEvents.filter(({ pin }) => pin === pinName);

  if (events.length === 0) {
    throw new Error("co loi ", pinName);
  }

  const formattedOrg = events[0].formattedOrg;
  const org = events[0].org;
  const location = events[0].location;
  const showcases = events[0].showcases;
  const lastDate = getLaterDate(
    ...events.reduce((acc, { lastDate, friday }) => {
      return [...acc, lastDate, ...(friday ? [friday.lastDate] : [])];
    }, [])
  );

  const lnglat = (allPlaces[location].allPins[pinName] = ["concac", "concac"]);
  const processedType = events.reduce((acc, { processedType, friday }) => {
    return { ...acc, ...processedType, ...(friday ? friday.processedType : {}) };
  }, {});
  const type = Object.keys(processedType);
  if (allShowcases[showcases]) {
    const showcase = allShowcases[showcases];
    showcase.pins.push(pinName);
    showcase.processedLocation[location] = true;
    showcase.processedType = {
      ...processedType,
      ...showcase.processedType,
    };
    showcase.lastDate = getLaterDate(showcase.lastDate, lastDate);
  } else {
    allShowcases[showcases] = {
      pins: [pinName],
      processedLocation: { [location]: true },
      processedType: processedType,
      lastDate: lastDate,
    };
  }

  events.forEach((event) => {
    event.lnglat = lnglat;
    event.pinName = pinName;
  });

  return {
    ...acc,
    [pinName]: {
      formattedOrg,
      org,
      location,
      processedType,
      type,
      lastDate,
      lnglat,
      showcases,
      events,
    },
  };
}, {});

let bounds = null;
for (const key in allPlaces) {
  const {
    allPins,
    lnglat: [longitude, latitude],
    rotation,
  } = allPlaces[key];
  const distance = 0.00023;

  let i = 0;
  const allKeys = Object.keys(allPins);
  const length = allKeys.length;

  if (length == 1) {
    allPins[allKeys[0]][0] = longitude;
    allPins[allKeys[0]][1] = latitude;
  } else {
    const rotationRad = (rotation ?? 130 * Math.PI) / 180;
    for (const key in allPins) {
      const angle = (i * 2 * Math.PI) / length + rotationRad; // Angle for each point in radians
      allPins[key][0] = longitude + distance * Math.cos(angle);
      allPins[key][1] = latitude + distance * Math.sin(angle);
      i++;
    }
  }

  for (const key in allPins) {
    const lnglat = allPins[key];
    if (bounds) {
      bounds.extend(lnglat);
    } else {
      bounds = new mapboxgl.LngLatBounds(lnglat, lnglat);
    }
  }
}

const sw = bounds.getSouthWest();
const ne = bounds.getNorthEast();
const LngLatBounds = [
  [sw.lng, sw.lat],
  [ne.lng, ne.lat],
];

Object.keys(allShowcases).forEach((key, i) => {
  allShowcases[key].pinIndex = i + 1;
});

export { allShowcases, allPins, allPlaces, longQuery, allEvents, LngLatBounds };
