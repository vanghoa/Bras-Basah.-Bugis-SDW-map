import OrgLink from "../../components/Layout/OrganizersLink";

export default function DESIGN({ children }) {
  return (
    <>
      <p>
        DESIGN explores the empowering nature of design by placing it directly in the hands of
        people from diverse walks of life. This experiment in the democratisation of design
        demonstrates that design sensibilities can be accessible to all and beneficial across
        various contexts.
      </p>
      <p>
        Curated at the intersection of design pedagogy and practice, the exhibition features
        workshops developed and led by four designer-educators, each exploring a distinct theme:
        emerging tech, care, sustainability, and culture. These tracks, currently in progress, are
        led by:
      </p>
      <p>
        Clement Zheng (Interactive Materials Lab): tackling “sustainability” by empowering kids and
        their parents through interaction design. Tamsin Greulich-Smith (School of X): addressing
        “care” by empowering communities through collective design. Donn Koh (Hypersketch): focusing
        on “emerging tech” by empowering seniors through generative AI and speculative design. Hu
        Fang (Atelier Fang): exploring “culture” by empowering non-culinary professionals through
        food design.
      </p>
      <p>
        Visitors will encounter a variety of solutions crafted by participants from a diverse range
        of demographics, showcasing a rich tapestry of creativity and ingenuity enabled through
        design. The showcase also provides an in-depth look at the workshop briefs and processes,
        offering insights into the methodologies employed. This celebration of design’s
        transformative ability highlights its power to bring people together and foster innovative
        thinking.
      </p>
      {children}
      <div className="credits">
        DESIGN is presented at the National Design Centre, organised by <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
