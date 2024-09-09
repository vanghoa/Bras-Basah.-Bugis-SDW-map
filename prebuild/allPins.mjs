import { allEvents } from "./allEvents.mjs";
import { allPlaces } from "./allPlaces.mjs";

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

  const location = events[0].location;
  const showcases = events[0].showcases;
  const processedDate = events[0].processedDate;
  const lnglat = (allPlaces[location].allPins[pinName] = ["concac", "concac"]);
  const processedType = events.reduce((acc, { processedType, showcases }) => {
    return { ...acc, ...processedType };
  }, {});
  const type = Object.keys(processedType);
  if (allShowcases[showcases]) {
    allShowcases[showcases].pins.push(pinName);
    allShowcases[showcases].processedLocation[location] = true;
    allShowcases[showcases].processedType = {
      ...processedType,
      ...allShowcases[showcases].processedType,
    };
  } else {
    allShowcases[showcases] = {
      pins: [pinName],
      processedLocation: { [location]: true },
      processedType: processedType,
    };
  }

  return {
    ...acc,
    [pinName]: {
      location,
      processedType,
      type,
      processedDate,
      lnglat,
      showcases,
      events,
    },
  };
}, {});

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
    continue;
  }

  const rotationRad = (rotation ?? 130 * Math.PI) / 180;
  for (const key in allPins) {
    const angle = (i * 2 * Math.PI) / length + rotationRad; // Angle for each point in radians
    allPins[key][0] = longitude + distance * Math.cos(angle);
    allPins[key][1] = latitude + distance * Math.sin(angle);
    i++;
  }
}

Object.keys(allShowcases).forEach((key, i) => {
  allShowcases[key].pinIndex = i + 1;
});

export { allShowcases, allPins, allPlaces };
