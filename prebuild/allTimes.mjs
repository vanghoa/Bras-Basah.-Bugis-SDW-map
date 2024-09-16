const allTimes = {
  now: "Happening now",
  fri: "Friday Late (27 Sept)",
};

for (const i in allTimes) {
  allTimes[i] = {
    name: allTimes[i],
  };
}

export { allTimes };
