import OrgLink from "../../components/Layout/OrganizersLink";

export default function SpecialMenuwithTipo({ children }) {
  return (
    <>
      <p>[Awaiting write up]</p>
      {children}
      <div className="credits">
        EAT is presented at the National Design Centre in partnership with Tipo Pasta Bar,
        co-organised by <OrgLink name={"FANG"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
