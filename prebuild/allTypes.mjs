const allTypes = {
  exh: "exhibition",
  wks: "workshop",
  tour: "tour",
  exp: "experience",
  pre: "talk/presentation",
  oth: "other",
};

for (const i in allTypes) {
  allTypes[i] = {
    name: allTypes[i],
  };
}

export { allTypes };
