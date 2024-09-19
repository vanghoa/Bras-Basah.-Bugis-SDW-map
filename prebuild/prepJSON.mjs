import * as fs from "fs";
import {
  allPins,
  allShowcases,
  allPlaces,
  longQuery,
  allEvents,
  LngLatBounds,
} from "./allPins.mjs";
import { middleLngLat } from "./allPlaces.mjs";
import { allTypes } from "./allTypes.mjs";
import { allTimes } from "./allTimes.mjs";
import { allOrganizers } from "./allShowcases.mjs";

hardCodedData(
  {
    allEvents,
    longQuery,
    allPins,
    allPinKeys: Object.keys(allPins),
    allPlaces,
    allShowcases,
    allShowcaseKeys: Object.keys(allShowcases),
    allTypes,
    middleLngLat,
    allTimes,
    allOrganizers,
    LngLatBounds,
  },
  "data.json"
);

function hardCodedData(data, filepath) {
  fs.writeFileSync(`./src/json/${filepath}`, JSON.stringify(data));
}
