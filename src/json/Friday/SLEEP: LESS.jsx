import OrgLink from "../../components/Layout/OrganizersLink";

export default function SLEEPLESS({ children }) {
  return (
    <>
      <p>
        SLEEP: LESS is a VR experience exploring eight sleep stories of individuals with unusual
        circadian cycles and different relationships to sleep. The narratives unfold through an
        immersive exploration of the biochemical signals from the brain, revealing disrupted sleep
        cycles and other ways of inhabiting our restless city. With curiosity, we nurture a sense of
        empathy for those among us who often do not have a choice in their circadian rhythms,
        finding loneliness, solitude, or hidden networks.
      </p>
      <p>
        After experiencing the VR installation, a brew bar offers a cup of caffeine-free tea as we
        contemplate the stories of the sleepless.
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
