import { formatDate, getLaterDate, displayDate } from "./functions.mjs";

const allEvents = [
  {
    name: "READ: BOOK",
    showcases: "Read",
    type: ["exh", "ins"],
    location: ["nlb"],
    date: ["26/9-6/10"],
    time: "10am – 7pm",
    short: `READ presents Atelier HOKO's interrogation of the physical book through an immersive exhibition at the National Library.`,
    long: "READBOOK",
    pin: "read",
    friday: {
      type: ["auc"],
      date: `27 Sep, 3 pm – 10 pm`,
      long: "READBOOK",
    },
  },
  {
    name: "EAT: Transformative Seeds",
    showcases: "Eat",
    type: ["exh"],
    location: ["ndc"],
    date: ["26/9-10/11"],
    time: "9am – 9pm",
    short: `EAT explores food design by investigating seeds through culinary transformations and material innovations.`,
    long: "EATTransformativeSeeds",
    pin: "eat1",
  },
  {
    name: "A++ Recipe Workshop",
    showcases: "Eat",
    type: ["wks"],
    location: ["tipo"],
    date: ["23/7,25/7"],
    time: "2.30 – 5.30pm",
    short: ``,
    long: "ARecipeWorkshop",
    pin: "eat2",
  },
  {
    name: "Special Menu with Tipo",
    showcases: "Eat",
    type: ["pre"],
    location: ["tipo"],
    date: ["26/9-3/10"],
    time: "",
    short: ``,
    long: "SpecialMenuwithTipo",
    pin: "eat2",
  },
  {
    name: "SHOP",
    showcases: "Shop",
    type: ["exh"],
    location: ["bgs+"],
    date: ["26/9-6/10"],
    time: "10am – 10pm",
    short: `SHOP explores the intricate dynamics of how shops, shopping, and shoppers are intertwined with design.`,
    long: "SHOP",
    pin: "shop1",
  },
  {
    name: "SHOP",
    showcases: "Shop",
    type: ["exh"],
    location: ["bgs+"],
    date: ["26/9-6/10"],
    time: "10am – 10pm",
    short: `SHOP explores the intricate dynamics of how shops, shopping, and shoppers are intertwined with design.`,
    long: "SHOP",
    pin: "shop1",
  },
  {
    name: "SHOP",
    showcases: "Shop",
    type: ["exh"],
    location: ["bgsst"],
    date: ["26/9-6/10"],
    time: "10am – 10pm",
    short: `SHOP explores the intricate dynamics of how shops, shopping, and shoppers are intertwined with design.`,
    long: "SHOP",
    pin: "shop2",
  },
  {
    name: "HEAL: Repair+",
    showcases: "Heal",
    type: ["exh"],
    location: ["blckbx"],
    date: ["26/9-6/10"],
    time: "10am – 10pm",
    short: `HEAL explores mending emotional memories through restorative design in a curation of transformed broken objects.`,
    long: "HEALRepair",
    pin: "heal",
  },
  {
    name: "SLEEP: DIVING IN",
    showcases: "Sleep",
    type: ["oth:Immersive Experience and Room Installation"],
    location: ["naumi"],
    date: ["26/9-6/10", "-27/9"],
    time: "Check in 3pm, Check out 11am",
    short: `SLEEP: DIVING IN explores the elements of ideal sleep hygiene rituals that could overcome primary insomnia.`,
    long: "SLEEPDIVINGIN",
    pin: "sleep",
  },
  {
    name: "SLEEP: LESS",
    showcases: "Sleep",
    type: ["oth:VR Installation"],
    location: ["naumi"],
    date: ["26/9-6/10"],
    time: `11am – 2pm, 3pm – 7pm 
  *30 mins slots to be booked`,
    short: `SLEEP: LESS is a VR experience exploring five sleep stories of individuals with different relationships to sleep.`,
    long: "SLEEPLESS",
    pin: "sleep",
  },
  {
    name: "COMMUTE: My Riding Tribe",
    showcases: "Commute",
    type: ["exh"],
    location: ["bclnMRT"],
    date: ["26/9-6/10"],
    time: "",
    short: `COMMUTE unveils your MRT personality at Bencoolen Station with "My Riding Tribe" through a design research adventure.`,
    long: "COMMUTEMyRidingTribe",
    pin: "commute",
  },
  {
    name: "PLANT",
    showcases: "Plant",
    type: ["exh"],
    location: ["nlb"],
    date: ["26/9-6/10"],
    time: "10am – 9pm",
    short: `PLANT reimagines household planters that twist traditional concepts of use and appreciation.`,
    long: "PLANT",
    pin: "plant",
  },
  {
    name: "DISPLAY",
    showcases: "Display",
    type: [],
    location: ["nlb"],
    date: [],
    time: ``,
    short: `DISPLAY presents experimental creations by Studio Juju that explore the idea
  of DISPLAY, both as an object and a system.`,
    long: "DISPLAY",
    pin: "display",
  },
  {
    name: "MAKE: Me(n)tal",
    showcases: "Make",
    type: ["exh"],
    location: ["NAFA"],
    date: ["26/9-6/10"],
    time: `10am – 9pm (TBC)`,
    short: `MAKE discovers metal's potential as creatives transform scraps into treasures that celebrate its innate qualities.`,
    long: "MAKEMental",
    pin: "make",
  },
  {
    name: "DESIGN",
    showcases: "Design",
    type: ["exh"],
    location: ["ndc"],
    date: ["26/9-10/11"],
    time: `9am – 9pm`,
    short: `DESIGN showcases innovative works by everyday people, empowered by the transformative power of design.`,
    long: "DESIGN",
    pin: "design",
  },
];

// const allShowcases = {};

for (const event of allEvents) {
  event.location = event.location[0];
  //
  const processedDate = (event.processedDate = {
    from: null,
    to: null,
    inc: [],
    exc: {},
    last: null,
  });
  const { date, showcases, org, type } = event;
  event.othertype = [];
  //
  for (const typ in type) {
    const name = type[typ].split(":");
    type[typ] = name[0];
    if (type[typ] == "oth") {
      event.othertype.push(name[1]);
    }
  }
  //
  for (const d of date) {
    if (d.startsWith("-")) {
      const ds = d.substring(1).split(",");
      processedDate.exc = ds.reduce((a, dss) => ({ ...a, [formatDate(dss)]: true }), {});
    } else if (d.includes(",")) {
      const ds = d.split(",");
      processedDate.inc = ds.map((dss) => formatDate(dss));
    } else if (d.includes("-")) {
      const ds = d.split("-");
      processedDate.from = formatDate(ds[0]);
      processedDate.to = formatDate(ds[1]);
    }
  }
  processedDate.last = getLaterDate(
    processedDate.to,
    processedDate.inc[processedDate.inc.length - 1]
  );
  processedDate.inc = processedDate.inc.reduce((a, v) => ({ ...a, [v]: true }), {});
  if (processedDate.to && processedDate.from) {
    event.formattedDate = `${displayDate(processedDate.from)} - ${displayDate(processedDate.to)}`;
  } else {
    const arr = Object.keys(processedDate.inc);
    event.formattedDate = `${arr
      .map((date, i) => {
        return `${displayDate(date)}${
          i + 1 == arr.length ? `.` : i + 1 == arr.length - 1 ? ` and ` : " * "
        }`;
      })
      .join("")}`;
  }
  //
  event.processedType = event.type.reduce((a, v) => ({ ...a, [v.split(":")[0]]: true }), {});
  //
  /*
  if (allShowcases[showcases]) {
    allShowcases[showcases].number++;
    allShowcases[showcases].events.push(event);
  } else {
    allShowcases[showcases] = {
      name: showcases,
      number: 0,
      events: [event],
    };
  }*/
}

/*
const allEvents1 = [...allEvents].sort(
  ({ processedDate: { last: a } }, { processedDate: { last: b } }) =>
    new Date(b) - new Date(a)
);
const allEvents2 = [...allEvents1].reverse();
*/

export { allEvents };
