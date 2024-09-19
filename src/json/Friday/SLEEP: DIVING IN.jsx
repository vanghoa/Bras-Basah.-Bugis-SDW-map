import OrgLink from "../../components/Layout/OrganizersLink";

export default function SLEEPDIVINGIN({ children }) {
  return (
    <>
      <p>
        SLEEP: DIVING IN explores the elements of ideal sleep hygiene rituals that could overcome
        primary insomnia. Join us for this designers' guided tour as they bring us through their
        hotel room installation at Naumi Hotel Singapore. The tour is capped at five persons for
        each time slot on a first-come, first-served basis.
      </p>
      {children}
      <div className="credits">
        Designed by <OrgLink name={"FW"} />, in collaboration with students from the BA (Hons)
        Design for Social Futures programme at the Lasalle College of the Arts, University of Arts
        Singapore.
      </div>
    </>
  );
}
