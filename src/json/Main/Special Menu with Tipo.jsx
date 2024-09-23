import OrgLink from "../../components/Layout/OrganizersLink";

export default function SpecialMenuwithTipo({ children }) {
  return (
    <>
      <p>
        TIPO Pasta Bar is presenting an exclusive “POP POWER” menu during Singapore Design Week
        2024.
      </p>
      <p>
        Inspired by the theme of “seeds” and developed in collaboration with food design studio
        Atelier Fang, this unique menu is part of EAT: Transformative Seeds, a food design
        exhibition at the National Design Centre that explores the concept of seeds through
        creativity and design.
      </p>
      <p>Both reservations and walk-ins are welcome.</p>
      {children}
      <div className="credits">
        EAT is presented at the National Design Centre in partnership with Tipo Pasta Bar,
        co-organised by <OrgLink name={"FANG"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
