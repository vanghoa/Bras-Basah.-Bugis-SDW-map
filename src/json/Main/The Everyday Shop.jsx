import OrgLink from "../../components/Layout/OrganizersLink";

export default function TheEverydayShop({ children }) {
  return (
    <>
      <p>
        This second segment of SHOP takes the form of a pop-up shop located directly in the main
        walkway of Bugis+, a mall described in their website as “a vibrant lifestyle destination”.
        Instead of competing with the large selection of shops in this multi-storey mall, we offer a
        contrasting selection of products that invites shoppers to deliberate, contemplate, or even
        be in a position of dilemma.
      </p>
      <p>
        More than 20 designers and creatives are invited to exhibit small works and stock multiple
        ‘reproductions’ of them in this shop. These are items familiar to the everyday consumer that
        range from wearables, household items, desktop objects, display items, small furniture,
        etc., but they reflect unusual qualities that differ from mass-produced or mass market
        items. Among several qualities, the most distinct one is that they are made using highly
        common or simple materials, tools, and/or processes that shoppers would themselves have
        access to. This means that these designs also allow or encourage shoppers to recreate or
        improvise their own versions or variations of these items for their personal use instead of
        buying them. This way, shoppers have the option of exchanging time and effort instead of
        money for desired goods.
      </p>
      <p>
        In this shop, each of the objects on display and offered for sale questions consumption in
        different ways and invites conversations around our shopping decisions or behaviours. Can
        the roles between everyday consumers and producers of goods be reversed? Or can the idea
        behind a design carry as much value as its material form/function? What happens when a shop
        puts equal effort into selling and not selling its goods and products? Is a product only
        successful when it can be sold? What do we actually buy when we shop?
      </p>
      {children}
      <div className="credits">
        SHOP is presented in partnership with Bugis+ and Bugis Street and is co-organised by{" "}
        <OrgLink name={"gj"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
