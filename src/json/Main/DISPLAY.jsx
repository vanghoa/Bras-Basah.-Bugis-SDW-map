import OrgLink from "../../components/Layout/OrganizersLink";

export default function DISPLAY({ children }) {
  return (
    <>
      <p>
        DISPLAY focuses on the experimental approach of Studio Juju exploring the idea of “display”
        in exhibition making.
      </p>
      <p>
        Exhibitions are curated environments for funnelled information exchange and inspirational
        interactions, with some existing only for short periods of time. Besides balancing the
        relationship between anonymous spaces and the diverse nature of the subjects, exhibition
        making also brings the question of a creation’s period of usefulness.
      </p>
      <p>
        What is the lifespan of these ‘backdrops’ created for the sole purpose of displaying the
        “protagonists”? And how can exhibition making be carefully considered and produced more
        responsibly, without the need to overdo and over-design?
      </p>
      <p>
        DISPLAY was intentionally conceived in contrary to a white plinth, the symbol of disposable
        exhibition making. Using modest materials that are vernacular and tactile, the exploration
        strives to develop an idea of display that can be long-lasting so that itthey outlives the
        exhibition itself, extending its role beyond temporal structure. The system—a singular
        object that articulates to different heights and modes of display—befits the exhibition’s
        characters. Through this exploration, Studio Juju will demonstrate their interpretations of
        DISPLAY, both as a sculptural object and a functional concept.
      </p>
      <p>
        The exhibition system developed is applied to three exhibitions in the People of Design
        Showcase Series: DESIGN at the National Design Centre, HEAL at 42 Waterloo, and PLANT at the
        National Library.
      </p>
      {children}
      <div className="credits">
        DISPLAY is presented at the National Library Building in partnership with the National
        Library Board, co-organised by Studio Juju and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
