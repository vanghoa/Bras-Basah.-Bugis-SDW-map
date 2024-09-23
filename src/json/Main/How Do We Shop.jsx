import OrgLink from "../../components/Layout/OrganizersLink";

export default function HowDoWeShop({ children }) {
  return (
    <>
      <p>
        In this final exhibition of SHOP, a group of international designers and
        collectives — Darius Ou, Ejin Sha, MULU Office, SMSM, and Yui Takada — contribute works that
        collectively explore various aspects of shopping and consumption across cultures or cities.
        Open-ended in nature, these are works that make public one’s expenditures, slow down
        otherwise fast and fleeting digital displays and signages, observe the uncanny similarities
        between commercial and cultural “window” displays, reveal our obsession with shopping even
        in the afterlife, or comments on the accumulation of things driven through freebies or other
        shopping related ephemera.
      </p>
      <p>
        Located right in the centre of all kinds of shopping activities, this exhibition hopes to be
        part of the action. By turning shoppers into spectators of shopping, we hope everyday
        consumers would rediscover and be made aware of how we shop, especially in a country where
        shopping is described as a “national leisure activity”.
      </p>
      {children}
      <div className="credits">
        SHOP is presented in partnership with Bugis+ and Bugis Street and is co-organised by{" "}
        <OrgLink name={"gj"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
