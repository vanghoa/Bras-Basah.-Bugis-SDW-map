import { useNavigate } from "react-router-dom";
import { sideMenuNavigate } from "../../utils/utils";
import data from "../../json/data.json";
import { Fragment } from "react";
import ShowcaseName from "../../components/Layout/ShowcaseName";

const { allShowcaseKeys } = data;

const Link = ({ name, navigate }) => {
  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        navigate("/");
        sideMenuNavigate(name, { anchor: window.pinlistRef.current[name] });
      }}
    >
      {name}
    </a>
  );
};

export default function PeopleofDesignShowcaseSeries() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="fdisp">
        <ShowcaseName name={"SHOWTITLE"} />
      </h1>
      <div className="description long">
        <p>
          During Singapore Design Week 2024, ten showcases presented across the Bras Basah.Bugis
          Design District will creatively examine the rituals of daily life through the lens of
          design. Challenging the mundane, each showcase delves into a specific activity such as{" "}
          {allShowcaseKeys.map((name, i) => {
            return (
              <Fragment key={i}>
                <Link name={name} navigate={navigate} />
                {i === allShowcaseKeys.length - 2
                  ? " and "
                  : i < allShowcaseKeys.length - 2 && ", "}
              </Fragment>
            );
          })}
          . Through new works and collaborative projects, visitors will discover imaginative design
          possibilities shaped to offer fresh perspectives on the world around us, inspiring new
          ways of thinking, seeing, and experiencing daily life.
        </p>
        <p>
          The People of Design showcases are led by Hans Tan, together with a team of
          designer-curators from Atelier Fang, Atelier HOKO, Forest & Whale, gideon-jamie, J.A.B.O.C
          (Just A Band of Creatives), brief , Studio Juju and Yishun Health.
        </p>
      </div>
    </>
  );
}
