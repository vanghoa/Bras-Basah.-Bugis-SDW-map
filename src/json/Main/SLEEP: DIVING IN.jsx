import OrgLink from "../../components/Layout/OrganizersLink";

export default function SLEEPDIVINGIN({ children }) {
  return (
    <>
      <p>
        SLEEP is a two-part experience comprising SLEEP: DIVING IN and SLEEP: LESS, investigating
        elements of ideal sleep hygiene rituals to overcome insomnia and the stories of individuals
        with different relationships to sleep.
      </p>
      <p>
        In SLEEP: DIVING IN, elements of ideal sleep hygiene rituals to overcome the increasingly
        ubiquitous primary insomnia that many urban dwellers struggle with, are explored through an
        overnight stay at Naumi Hotel Singapore. With self-guided instructions, the participant
        deep-dives into a journey to embrace sleep, that mediates sleep hormones through various
        activities within the hotel room and its grounds, where disrupted circadian rhythms begin to
        reset with a holistic biopsychosocial approach.
      </p>
      {children}
      <div className="credits">
        SLEEP is presented in partnership with Naumi Hotel Singapore, co-organised by{" "}
        <OrgLink name={"FW"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
