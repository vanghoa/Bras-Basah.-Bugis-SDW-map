import OrgLink from "../../components/Layout/OrganizersLink";

export default function COMMUTE({ children }) {
  return (
    <>
      <p>
        A sharing session on ethnographic analysis of commuter behaviours that reveals the hidden
        patterns within our daily commute. Discover the nuances of commuting culture and learn how
        to incorporate design research into daily life through the art of observation. The session
        will include a 30-minute introduction to practical design research methods and an exhibition
        walkthrough, followed by a 20-minute Q&A with the team, exploring design research across
        different levels of seniority.
      </p>
      {children}
      <div className="credits">
        This event is presented in partnership with the Land Transport Authority and SBS Transit
        Rail, co-organised by <OrgLink name={"brief"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
