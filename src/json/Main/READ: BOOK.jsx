import OrgLink from "../../components/Layout/OrganizersLink";

export default function READBOOK({ children }) {
  return (
    <>
      <p>
        READ examines the intimacy and relationships between human beings and books through a
        first-person experience of observations through the context of reading.
      </p>
      <p>
        “What does it mean to read a book?” As physical books continue to matter less and less in
        our everyday, what are we losing? Are we less aware of things, textures and space? Do we
        become oblivious to light hues and tonalities? Are we unable to keep our hands in a fixed
        position for long periods of time, of which it is not tedium that defines the duration but
        the gentle interaction with a book’s physical materiality…{" "}
      </p>
      <p>
        In today's era of artificial intelligence, we find ourselves once again questioning our own
        humanity. Amidst this uncertainty, Atelier HOKO has chosen the book as both subject and
        context to explore and interrogate the intrinsic human behaviours associated with reading.
        It raises the discussion of how the humble book will continue to resist the digitisation of
        our reading experience, not out of nostalgia or resistance to change, but as a necessity to
        understand what reading truly means.{" "}
      </p>
      <p>
        This showcase is developed from the 16th edition of Atelier HOKO’s research publication
        series “Science of the Secondary”, where the subject of “BOOK” is thoroughly interrogated
        through a sense-based process of inquiry.
      </p>
      {children}
      <div className="credits">
        READ is presented at the National Library Building in partnership with the National Library
        Board, co-organised by <OrgLink name={"HOKO"} /> and <OrgLink name={"Hans"} />.
      </div>
    </>
  );
}
