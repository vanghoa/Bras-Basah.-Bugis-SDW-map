const allTypes = {
  exh: "exhibition",
  ins: "installation",
  wks: "workshop",
  pre: "presentation",
  oth: "other",
};

for (const i in allTypes) {
  allTypes[i] = {
    name: allTypes[i],
  };
}

export { allTypes };
