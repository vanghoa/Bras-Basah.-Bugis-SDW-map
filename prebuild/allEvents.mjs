import { formatDate, getLaterDate, displayDate } from "./functions.mjs";
import { allTypes } from "./allTypes.mjs";
import { allPlaces } from "./allPlaces.mjs";
import { allShowcasesInfo, allOrganizers } from "./allShowcases.mjs";

const longQuery = {};

const allEvents = [
  {
    name: "READ: BOOK?",
    showcases: "Read",
    type: ["exh"],
    location: ["nlb"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 9 pm",
    short: `READ presents Atelier HOKO's interrogation of the physical book through an immersive exhibition at the National Library.`,
    long: "READBOOK",
    pin: "read",
    friday: {
      name: "What’s Wrong with Well Worn?",
      type: ["oth:Auction (free admission)"],
      date_html: `27 Sep, 3 pm – 10 pm`,
    },
  },
  {
    name: "EAT: Transformative Seeds",
    showcases: "Eat",
    type: ["exh", "wks"],
    location: ["ndc"],
    date: ["26/9-10/10"],
    date_html: "26 Sep – 10 Oct, 9 am – 9 pm",
    short: `EAT explores food design by investigating seeds through culinary transformations and material innovations.`,
    long: "EATTransformativeSeeds",
    pin: "eat1",
    friday: {
      name: `Designers’ Live Tour: 
Interactive Experiences and Tastings`,
      type: ["exp:Live Demonstration (free admission)"],
      date_html: `27 Sep, 6.30 pm – 10.30 pm`,
    },
  },
  {
    name: "Special Menu with Tipo",
    showcases: "Eat",
    type: ["pre:Presentation (special menu)"],
    location: ["tipo"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 11 am – 10 pm",
    short: `EAT explores food design by investigating seeds through culinary transformations and material innovations.`,
    long: "SpecialMenuwithTipo",
    pin: "eat2",
  },
  {
    name: "A Shopping Experience",
    showcases: "Shop",
    type: ["exh"],
    location: ["bgsst"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 10 pm",
    short: `SHOP explores the intricate dynamics of how shops, shopping, and shoppers are intertwined with design.`,
    long: "AShoppingExperience",
    pin: "shop1",
    friday: {
      name: `Friday Shopping! at Bugis Street`,
      type: ["oth:Giveaway (open event)"],
      date_html: `27 Sep, 7 pm – 9 pm`,
    },
  },
  {
    name: "The Everyday Shop",
    showcases: "Shop",
    type: ["exh", "oth:Shop"],
    location: ["bgs+"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 10 pm",
    short: `SHOP explores the intricate dynamics of how shops, shopping, and shoppers are intertwined with design.`,
    long: "TheEverydayShop",
    pin: "shop2",
  },
  {
    name: "How Do We Shop?",
    showcases: "Shop",
    type: ["exh"],
    location: ["bgs+"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 10 pm",
    short: `SHOP explores the intricate dynamics of how shops, shopping, and shoppers are intertwined with design.`,
    long: "HowDoWeShop",
    pin: "shop2",
    friday: {
      name: `Friday Shopping! at Bugis+`,
      type: ["tour:Tour (open event)"],
      date_html: `27 Sep, 7 pm – 9 pm`,
    },
  },
  {
    name: "HEAL: Repair+",
    showcases: "Heal",
    type: ["exh"],
    location: ["blckbx"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 10 pm",
    short: `HEAL explores mending emotional memories through restorative design in a curation of transformed broken objects.`,
    long: "HEALRepair",
    pin: "heal",
    friday: {
      name: `Re: Repair`,
      type: ["pre:Talk (free with registration)"],
      date_html: `27 Sep
Panel discussion 1: 7.30 pm – 8pm
Panel discussion 2: 9 pm – 9.30 pm
`,
      extra_html: "ReRepair",
    },
  },
  {
    name: "SLEEP: DIVING IN",
    showcases: "Sleep",
    type: ["tour:Tour (ticketed)"],
    location: ["naumi"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, specific timeslots",
    extra_html: "SLEEPDIVINGIN",
    short: `SLEEP: DIVING IN explores the elements of ideal sleep hygiene rituals that could overcome primary insomnia.`,
    long: "SLEEPDIVINGIN",
    pin: "sleep",
    friday: {
      name: `SLEEP: DIVING IN (extended hours)`,
      type: ["tour:Tour (free with registration)"],
      date_html: `27 Sep, specific timeslots`,
      extra_html: "SLEEPDIVINGIN",
    },
  },
  {
    name: "SLEEP: LESS",
    showcases: "Sleep",
    type: ["exh:Exhibition (free with registration)"],
    location: ["naumi"],
    date: ["26/9-6/10"],
    date_html: `26 Sep – 6 Oct, specific timeslots`,
    extra_html: "SLEEPLESS",
    short: `SLEEP: LESS is a VR experience exploring five sleep stories of individuals with different relationships to sleep.`,
    long: "SLEEPLESS",
    pin: "sleep",
    friday: {
      name: `SLEEP: LESS (extended hours)`,
      type: ["exp:VR Experience (free with registration)"],
      date_html: `27 Sep, specific timeslots`,
      extra_html: "SLEEPLESS",
    },
  },
  {
    name: "COMMUTE",
    showcases: "Commute",
    type: ["exh"],
    location: ["bclnMRT"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 5.30 am – 12 am",
    short: `COMMUTE unveils your MRT personality at Bencoolen Station with "My Riding Tribe" through a design research adventure.`,
    long: "COMMUTE",
    pin: "commute",
    friday: {
      name: `Ethnography of Commuter Behaviours: 
	An Insight into Creating the Tribe`,
      type: ["tour:Tour (open event)"],
      date_html: `27 Sep, 6 – 10 pm`,
    },
  },
  {
    name: "PLANT",
    showcases: "Plant",
    type: ["exh"],
    location: ["nlb"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 9 pm",
    short: `PLANT reimagines household planters that twist traditional concepts of use and appreciation.`,
    long: "PLANT",
    pin: "plant",
  },
  {
    name: "DISPLAY",
    showcases: "Display",
    type: ["exh"],
    location: ["nlb"],
    date: ["26/9-6/10"],
    date_html: "26 Sep – 6 Oct, 10 am – 9 pm",
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
    date_html: `26 Sep – 6 Oct, 10 am – 7 pm`,
    short: `MAKE discovers metal's potential as creatives transform scraps into treasures that celebrate its innate qualities.`,
    long: "MAKEMental",
    pin: "make",
    friday: {
      name: `Make a metal rose with Baremetal Co.`,
      type: ["wks"],
      date_html: `27 Sep, 8 – 10 pm`,
      extra_html: "MAKEMental",
    },
  },
  {
    name: "DESIGN",
    showcases: "Design",
    type: ["exh"],
    location: ["ndc"],
    date: ["26/9-10/11"],
    date_html: `26 Sep – 10 Nov, 9 am – 9 pm`,
    short: `DESIGN showcases innovative works by everyday people, empowered by the transformative power of design.`,
    long: "DESIGN",
    pin: "design",
    friday: {
      name: `Learn Creative Methods with Gen AI and 
	Envision Your Future Autonomous Vehicle`,
      type: ["wks"],
      date_html: `27 Sep 
1st session: 7.30 pm – 8.15 pm
2nd session: 8.30 pm – 9.15 pm
`,
      extra_html: "DESIGN",
    },
  },
];

// const allShowcases = {};

for (const i in allEvents) {
  const event = allEvents[i];
  // friday event
  const friday = event.friday ?? (event.friday = null);
  if (friday) {
    formatType(friday, { fri: true });
    friday.formattedDate = friday.date_html;
    friday.lastDate = new Date("09/27/2024").setHours(0, 0, 0, 0);
    delete friday.date_html;
  }
  // main event
  event.showcases = event.showcases.toUpperCase();
  // organizers
  event.formattedOrg = allOrganizers[allShowcasesInfo[event.showcases]].name;
  event.org = allShowcasesInfo[event.showcases];
  // location
  event.location = event.location[0];
  event.formattedLocation = allPlaces[event.location].name;
  event.ggmap = allPlaces[event.location].url;
  // type
  formatType(event);
  function formatType(event, init = {}) {
    const { type } = event;
    event.formattedType = [];
    for (const typ in type) {
      const name = type[typ].split(":");
      type[typ] = name[0];
      event.formattedType.push(name[1] || allTypes[name[0]].name);
    }
    event.processedType = event.type.reduce((a, v) => ({ ...a, [v.split(":")[0]]: true }), init);
  }
  // date
  const { date } = event;
  const processedDate = (event.processedDate = {
    from: null,
    to: null,
    inc: [],
    exc: {},
  });
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
  event.lastDate = getLaterDate(processedDate.to, processedDate.inc[processedDate.inc.length - 1]);
  processedDate.inc = processedDate.inc.reduce((a, v) => ({ ...a, [v]: true }), {});
  if (event.date_html) {
    event.formattedDate = event.date_html;
    delete event.date_html;
  } else if (processedDate.to && processedDate.from) {
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
  // long
  longQuery[event.long] = i;
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

export { allEvents, longQuery };
