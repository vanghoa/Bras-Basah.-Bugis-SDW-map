import OrgLink from "../../components/Layout/OrganizersLink";

export default function HowDoWeShop({ children }) {
  return (
    <>
      <p>
        In this third segment of SHOP, a small group of designers and collectives are invited to
        contribute works that collectively explore or comment on various aspects of shopping and
        consumption across cultures or cities. Broad in subject and open-ended in interpretation,
        what these works allude to could range from the health and well-being of anxious and
        over-stimulated shoppers to an obsession with shopping even in the afterlife, or from
        looking at the uncanny similarities between museum and shopping displays to the vast
        assortment of often rehashed or appropriated designs in souvenir objects. Located right in
        the center of all kinds of shopping activities, it makes sense for this exhibition to be a
        part of the action. By turning shoppers into spectators of shopping, we hope everyday
        consumers would rediscover and be made aware of how we shop, especially in a country where
        shopping is described as a “national leisure activity” (The Straits Times).
      </p>
      {children}
      <div className="credits">
        SHOP is presented in partnership with Bugis+ and Bugis Street and is co-organised by{" "}
        <OrgLink name={"gj"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
