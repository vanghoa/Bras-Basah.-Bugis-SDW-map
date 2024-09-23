import { useParams } from "react-router-dom";
import Overlay from "./Overlay";
import PeopleofDesignShowcaseSeries from "../../json/Main/People of Design Showcase Series";
import { useEffect, useRef } from "react";
import { GeneralScrollToEl } from "../../utils/utils";
import ShowcaseName from "./ShowcaseName";

export function AboutOverlay() {
  const { name } = useParams();
  const contentRef = useRef(null);
  useEffect(() => {
    if (name && contentRef.current) {
      const child = contentRef.current.querySelector(`#${name}`);
      child &&
        contentRef.current.scrollTo({
          top: child.offsetTop - 10,
          left: 0,
          behavior: "smooth",
        });
    }
  }, []);
  return (
    <Overlay contentRef={contentRef}>
      <div className="district">
        <h2 className="fdisp">
          <ShowcaseName isLow={true} name={`BRAS BASAH.\u200bBUGIS DESIGN DISTRICT`} />
        </h2>
        <p className="h2date">
          26 Sep<br></br>– 06 Oct 2024
        </p>
      </div>
      <PeopleofDesignShowcaseSeries isLow={true} />
      <h4>Bios</h4>
      <div className="about">
        <p id="Hans">
          <b>Hans Tan</b> is a designer maker, curator, and educator based in Singapore, whose work
          explores creativity through "deformative inquiry," making use of utility as a pretext for
          provoking discourse. His work, infused with narratives and collective memory, examines
          design and its industry. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://hanstan.net">
            hanstan.net
          </a>
          )
        </p>
        <p id="HOKO">
          <b>Atelier HOKO (2002)</b> is an independent research lab that focuses on the study of the
          growing disengagement between people, things and space. The atelier hopes to cultivate in
          people, an open-ness and ability to un-know, bringing about a heightened curiosity towards
          all phenomena by taking a fresh look at reality. Founded by Alvin Ho and Clara Koh. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://atelierhoko.com/">
            atelierhoko.com
          </a>
          )
        </p>
        <p id="FANG">
          <b>Atelier Fang</b>, based in Hangzhou, explores food-centred design through initiatives
          in design education, product development and production innovation. Operating the
          ‘ChiTofu’ Experimental Design Program, they specialise in deconstructing handcraft
          processes and narrating new food scenes. They believe food innovation brings diverse
          societal values. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://chitofu.com">
            chitofu.com
          </a>
          )
        </p>
        <p id="gj">
          <b>gideon-jamie</b> is a design studio also involved in publishing and running a space for
          books. Founded by Gideon Kong and Jamie Yeo, the studio develops critical responses
          through commissioned projects and independent work in the form of writings, designs, and
          ad-hoc exhibitions and workshops. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://gideon-jamie.com">
            gideon-jamie.com
          </a>
          )
        </p>
        <p id="Ys">
          <b>Yishun Health (YH)</b> is a network of medical institutions and health facilities of
          the National Healthcare Group in the north of Singapore, which includes Khoo Teck Puat
          Hospital and Yishun Community Hospital. Repair+ was generously funded by the Alexandra
          Health Fund, which aims to enhance health and quality of life for YH’s patients through
          measures such as education, research and community collaboration. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.ktph.com.sg/">
            https://www.ktph.com.sg/
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="http://yishuncommunityhospital.com.sg/"
          >
            {" "}
          </a>
          )
        </p>
        <p id="FW">
          <b>Gustavo Maggio and Wendy Chua lead Forest and Whale</b>, where design is a mediator
          between fields and agent of change. They design products, services and experiences that
          redefine the way people live, age-in-place and gather as communities. Selected for the EU
          STARTS residency, their work explores unseen climate precarity through the VR lens. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://forestandwhale.com">
            forestandwhale.com
          </a>
          )
        </p>
        <p id="brief">
          <b>brief.</b> is a Research and Design studio that bridges deep user insights with
          real-life application. Their outcome-agnostic approach makes innovation exploration
          accessible to those often priced out. Their ethos “Today's Research, Tomorrow's Design,”
          grounds their design solutions in thorough research to create impactful outcomes for the
          future. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://keepitbrief.co">
            keepitbrief.co
          </a>
          )
        </p>
        <p id="Ju">
          <b>Studio Juju</b> designs with fresh perspectives and emotional connection. Each project
          is a union of simplicity and warmth, utility and whimsy, refinement and relevance. In
          2024, the studio was one of 100 most creative and innovative product designers today in
          the book published by Phaidon, “Designed for Life: The World’s Best Product Designers”. (
          <a target="_blank" rel="noopener noreferrer nofollow" href="http://studio-juju.com">
            studio-juju.com
          </a>
          )
        </p>
        <p id="JABOC">
          <b>J.A.B.O.C (Just A Band of Creatives)</b> local band of artists, designers, makers and
          creative misfits with a small dream to share and celebrate art and design on the big
          stage. (
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="http://instagram.com/justabandofcreatives"
          >
            instagram.com/justabandofcreatives
          </a>
          )
        </p>
      </div>
    </Overlay>
  );
}
