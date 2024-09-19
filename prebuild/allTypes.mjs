const allTypes = {
  exh: "Exhibition",
  wks: "Workshop",
  tour: "Tour",
  exp: "Experience",
  pre: "Talk/Presentation",
  oth: "Other",
};

for (const i in allTypes) {
  allTypes[i] = {
    name: allTypes[i],
  };
}

export { allTypes };
