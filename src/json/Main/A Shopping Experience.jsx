import OrgLink from "../../components/Layout/OrganizersLink";

export default function AShoppingExperience({ children }) {
  return (
    <>
      <p>
        SHOP explores the intricate dynamics between design and shopping, pushing our understanding
        beyond familiar notions of this relationship through three experience segments. The first
        segment, A Shopping Experience, is an exhibition located in an unoccupied unit within Bugis
        Street, a street shopping location with a maze of nearly 400 shops that is rich in informal
        activities around shopping: makeshift interiors and setups, touting, busy displays,
        advertisements of all kinds, overflow of shop furniture and goods, eclectic wayfinding, and
        so on. In this exhibition, we ask the question: what is a shop? What if elements that
        usually constitute the shopping experience — its lighting, music, window displays, signages,
        furniture, display structures, etc. — are brought to the foreground instead? In this
        site-specific installation, we invite designers and creatives to observe and respond to the
        abundant practices and improvisations found in the shops of Bugis Street, each producing a
        work that contributes to a specific element of the shop’s design and experience. Free of any
        goods or services, can a shop still function as a shop? Can it offer ‘shopping’ as, truly,
        an experience?
      </p>
      {children}
      <div className="credits">
        SHOP is presented in partnership with Bugis+ and Bugis Street and is co-organised by{" "}
        <OrgLink name={"gj"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
