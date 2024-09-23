import OrgLink from "../../components/Layout/OrganizersLink";

export default function AShoppingExperience({ children }) {
  return (
    <>
      <p>
        SHOP is a set of three exhibitions exploring the dynamics between design and shopping. Given
        how much of design already propels consumption, can we use it to slow it down, change
        directions, or even reverse it?
      </p>
      <p>
        The first exhibition, A Shopping Experience is one located in an empty store unit within
        Bugis Street, a street shopping location with a maze of nearly 400 shops rich in informal
        activities around shopping: ad hoc interiors, busy displays, advertisements of all kinds,
        overflow of shop furniture and goods, eclectic wayfinding, and so on. Amidst hundreds of
        highly varied shop units, we ask: what is a shop? What if elements that usually constitute
        the shopping experience — its lighting, music, window displays, signages, furniture, display
        structures, etc. — are brought to the foreground? In this site-specific shop installation, 7
        local designers and artists were invited to observe and respond to the abundant practices
        and improvisations found in Bugis Street, each producing a work that forms a specific
        element of the shop’s design and experience. Like the cacophony of visuals and sounds one
        experiences while walking through the array of shops, this single shop unit brings together
        independently created works that either blend with or collide into each other, in ways that
        reflect the makeshift ingenuity and spontaneous compositions overflowing throughout Bugis
        Street. Still, unlike the other shop units, this is one free of any goods or services. Can
        it still function as a shop? Or can it offer “shopping” as, truly, an experience?
      </p>
      {children}
      <div className="credits">
        SHOP is presented in partnership with Bugis+ and Bugis Street and is co-organised by{" "}
        <OrgLink name={"gj"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
