import { Navigate, useNavigate } from "react-router-dom";
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

export default function PeopleofDesignShowcaseSeries({ isLow = false }) {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="fdisp">
        <ShowcaseName isLow={isLow} name={"SHOWTITLE"} />
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
        <p className="divider">———</p>
        <p>
          Join us on{" "}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.closeSearch();
              window.openNav(true);
              window.filterHandler("fri");
            }}
          >
            Friday
          </a>
          , 27th September, at BBB Design District for Friday Late events during Singapore Design
          Week with an exciting program line-up that invites you to explore the world of sleep
          through VR, entice your palate with food design performances, contemplate imperfection at
          a silent book auction, and engage with AI in interactive workshops to envision the future
          of design. With intriguing finds extending all the way to Bugis Street, check out the full
          list of programs highlighted below. As you explore the district's activities, be sure to
          stop by the National Design Centre for food and drinks!
        </p>
        <p className="divider">———</p>
        <h4>Acknowledgements</h4>
        <div className="designcredits">
          <p>
            <b>Typefaces</b> <br></br> BB.B typeface by Ying Tong Tan, Standard by Bryce Wilner.
          </p>
          <p>
            <b>Graphic design</b> <br></br> gideon-jamie, Ying Tong Tan, Bao Anh Bui
          </p>
          <p>
            <b>Website design and development</b> <br></br> Bao Anh Bui
          </p>
        </div>
        <p className="divider">———</p>
      </div>
    </>
  );
}
