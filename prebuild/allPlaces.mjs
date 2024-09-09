const allPlaces = {
  nlb: {
    lnglat: [1.297591742916379, 103.85430872353592],
    color: "orange",
    name: "National Library",
  },
  ndc: {
    lnglat: [1.2986713930955747, 103.85336466543913],
    color: "pink",
    name: "National Design Centre",
    rotation: -220,
  },
  tipo: {
    lnglat: [1.3000276310211587, 103.85276681390103],
    color: "violet",
    name: "Tipo Pasta Bar",
  },
  "bgs+": {
    lnglat: [1.299687603373886, 103.85422199984892],
    color: "white",
    name: "Bugis+",
  },
  bgsst: {
    lnglat: [1.3004835841755127, 103.85487145478659],
    color: "black",
    name: "Bugis Street",
  },
  blckbx: {
    lnglat: [1.2984248770599607, 103.85078237284628],
    color: "yellow",
    name: "42 Waterloo",
  },
  naumi: {
    lnglat: [1.2959744942521976, 103.85515240231982],
    color: "green",
    name: "Naumi Hotel",
  },
  bclnMRT: {
    lnglat: [1.2990994011748112, 103.85076011070184],
    color: "blue",
    name: "Bencoolen MRT Station",
  },
  NAFA: {
    lnglat: [1.2986870306983775, 103.85047983464034],
    color: "red",
    name: "NAFA Fashion Gallery, NAFA Campus 2",
  },
};

const middleLngLat = [0, 0];
for (const plc in allPlaces) {
  allPlaces[plc].lnglat = [allPlaces[plc].lnglat[1], allPlaces[plc].lnglat[0]];
  middleLngLat[0] += allPlaces[plc].lnglat[0];
  middleLngLat[1] += allPlaces[plc].lnglat[1];
  allPlaces[plc].allPins = {};
}
middleLngLat[0] /= Object.keys(allPlaces).length;
middleLngLat[1] /= Object.keys(allPlaces).length;

export { middleLngLat, allPlaces };
