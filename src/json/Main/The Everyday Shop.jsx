import OrgLink from "../../components/Layout/OrganizersLink";

export default function TheEverydayShop({ children }) {
  return (
    <>
      <p>
        The second exhibition, The Everyday Shop, is a pop-up shop and exhibition offering a
        selection of everyday goods that invite shoppers to deliberate, contemplate, or experience
        dilemmas while shopping. Over 20 designers and artists are invited to exhibit small works
        and stock multiple ‘reproductions’ of them in this shop. These are familiar items like
        wearables, household goods, desk accessories, stationery, and display items, but they
        reflect unusual qualities that differ from mass-produced or mass market items.
      </p>
      <p>
        A distinct characteristic of these items is that they are made using highly common
        materials, tools, and/or processes that everyday shoppers would also have access to. Anyone
        could reasonably recreate or improvise their own versions or variations of any desired item
        for their personal use instead of having to buy them — shoppers thereby have the “option” to
        exchange time and effort instead of money for desired goods.
      </p>
      <p>
        In this shop, the objects on display and offered for sale questions consumption in different
        ways and invites conversations around our shopping decisions or behaviours. Can the roles
        between everyday consumers and producers of goods be reversed? Or can the idea behind a
        design carry as much value as its material form/function? What happens when a shop like this
        puts equal effort into selling and not selling its goods? Is a product only successful when
        it is sold? What do we actually buy when we shop?
      </p>
      {children}
      <div className="credits">
        SHOP is presented in partnership with Bugis+ and Bugis Street and is co-organised by{" "}
        <OrgLink name={"gj"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
