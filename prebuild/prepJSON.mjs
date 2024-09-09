import * as fs from "fs";
import { allPins, allShowcases, allPlaces } from "./allPins.mjs";
import { middleLngLat } from "./allPlaces.mjs";
import { allTypes } from "./allTypes.mjs";

hardCodedData(
  {
    allPins,
    allPinKeys: Object.keys(allPins),
    allPlaces,
    allShowcases,
    allShowcaseKeys: Object.keys(allShowcases),
    allTypes,
    middleLngLat,
  },
  "data.json"
);

function hardCodedData(data, filepath) {
  fs.writeFileSync(`./src/json/${filepath}`, JSON.stringify(data));
}
