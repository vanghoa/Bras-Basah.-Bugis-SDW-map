import OrgLink from "../../components/Layout/OrganizersLink";

export default function EATTransformativeSeeds({ children }) {
  return (
    <>
      <p>
        EAT is a food design showcase that revolves around seeds as a central theme. It explores
        three main areas: culinary transformation and consumption, the propagation and migration of
        seeds, and the innovative use of food materials.
      </p>
      <p>
        POP POWER showcases the simplest and oldest methods of creative transformation with seeds.
        As a representative starting point, the first part of the showcase highlights cultural
        significance from the perspective of taste, sound and tool design through interactive
        experiences, products and kinetic installations.
      </p>
      <p>
        A BITE OF SEEDS mirrors the beauty of nature and the development of human civilisation.
        Discover the narratives of seed wandering, migration and evolution through works developed
        to detail these stories in the context of history.
      </p>
      <p>
        SEEDING BEYOND captures the fervour of designers as they venture into the realm of food
        materials. Inspired by ancient cooking techniques, they redefine food's purpose,
        transforming it into practical objects. This innovative approach, seen through a laboratory
        lens, expands food usage beyond nourishment, creating everyday items with a touch of
        ingenuity.
      </p>
      {children}
      <div className="credits">
        EAT is presented at the National Design Centre in partnership with Tipo Pasta Bar,
        co-organised by <OrgLink name={"FANG"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
