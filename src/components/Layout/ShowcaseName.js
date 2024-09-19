import { memo } from "react";

const ShowcaseName = memo(function ShowcaseName({ name }) {
  return (
    <span className="name">
      {name in ShowcaseNameList
        ? ShowcaseNameList[name]
        : name.split("").map((char, i) => {
            return (
              <span key={i} style={{ "--wght": randWght() }}>
                {char}
              </span>
            );
          })}
    </span>
  );
});

const randWght = () => Math.floor(Math.random() * 601) + 100;

const ShowcaseNameList = {
  COMMUTE: (
    <>
      <span style={{ "--wght": 100 }}>C</span>
      <span style={{ "--wght": 200 }}>O</span>
      <span style={{ "--wght": 300 }}>M</span>
      <span style={{ "--wght": 400 }}>M</span>
      <span style={{ "--wght": 200 }}>U</span>
      <span style={{ "--wght": 300 }}>T</span>
      <span style={{ "--wght": 100 }}>E</span>
    </>
  ),
  EAT: (
    <>
      <span style={{ "--wght": 200 }}>E</span>
      <span style={{ "--wght": 400 }}>A</span>
      <span style={{ "--wght": 600, "--l": "-.05em" }}>T</span>
    </>
  ),
  DISPLAY: (
    <>
      <span style={{ "--wght": randWght() }}>D</span>
      <span style={{ "--wght": randWght() }}>I</span>
      <span style={{ "--wght": randWght() }}>S</span>
      <span style={{ "--wght": randWght() }}>P</span>
      <span style={{ "--wght": randWght() }}>L</span>
      <span style={{ "--wght": randWght() }}>A</span>
      <span style={{ "--wght": randWght(), "--l": "-.05em" }}>Y</span>
    </>
  ),
  SHOWTITLE: (
    <>
      <span style={{ "--wght": randWght() }}>P</span>
      <span style={{ "--wght": randWght() }}>E</span>
      <span style={{ "--wght": randWght() }}>O</span>
      <span style={{ "--wght": randWght() }}>P</span>
      <span style={{ "--wght": randWght() }}>L</span>
      <span style={{ "--wght": randWght() }}>E</span>
      <span style={{ "--wght": randWght() }}>&nbsp;</span>
      <span style={{ "--wght": randWght() }}>O</span>
      <span style={{ "--wght": randWght() }}>F</span>
      <span style={{ "--wght": randWght() }}> </span>
      <span style={{ "--wght": randWght() }}>D</span>
      <span style={{ "--wght": randWght() }}>E</span>
      <span style={{ "--wght": randWght() }}>S</span>
      <span style={{ "--wght": randWght() }}>I</span>
      <span style={{ "--wght": randWght(), "--l": "-.02em" }}>G</span>
      <span style={{ "--wght": randWght() }}>N</span>
      <span style={{ "--wght": randWght() }}> </span>
      <span style={{ "--wght": randWght() }}>S</span>
      <span style={{ "--wght": randWght() }}>H</span>
      <span style={{ "--wght": randWght() }}>O</span>
      <span style={{ "--wght": randWght() }}>W</span>
      <span style={{ "--wght": randWght() }}>C</span>
      <span style={{ "--wght": randWght() }}>A</span>
      <span style={{ "--wght": randWght() }}>S</span>
      <span style={{ "--wght": randWght() }}>E</span>
      <span style={{ "--wght": randWght() }}> </span>
      <span style={{ "--wght": randWght() }}>S</span>
      <span style={{ "--wght": randWght() }}>E</span>
      <span style={{ "--wght": randWght() }}>R</span>
      <span style={{ "--wght": randWght() }}>I</span>
      <span style={{ "--wght": randWght() }}>E</span>
      <span style={{ "--wght": randWght() }}>S</span>
    </>
  ),
};

export default ShowcaseName;
