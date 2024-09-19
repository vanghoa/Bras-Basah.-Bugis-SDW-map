import OrgLink from "../../components/Layout/OrganizersLink";

export default function COMMUTE({ children }) {
  return (
    <>
      <p>
        COMMUTE offers an interactive experience at Bencoolen Station located within the Bras
        Basah.Bugis Design District. “My Riding Tribe” brings to life the diverse personalities of
        Singapore's MRT commuters through both physical and digital installations. Commuters can
        take a personality quiz to discover which whimsical ""tribe"" they belong to, making the
        daily ride more engaging and relatable.
      </p>
      <p>
        The installation features in-station displays and both in-station and online quizzes.
        Additionally, visitors can create and take home physical keepsakes that celebrate everyday
        commuting quirks and behaviors. “My Riding Tribe” captures the essence of shared routines
        and turns them into fun and informative experiences. Visit Bencoolen Station to explore the
        personalities that represent the heartbeat of Singapore's MRT system.
      </p>
      {children}
      <div className="credits">
        COMMUTE is presented in partnership with the Land Transport Authority and SBS Transit Rail,
        co-organised by <OrgLink name={"brief"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
