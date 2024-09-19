export default function MAKEMental({ children }) {
  return (
    <>
      <p>
        Unleash your inner artisan! Experience traditional metalworking and craft a stalk of rose
        under the guidance of Matthias Yong, skilled smith and founder of Baremetal Co. - a local,
        inspiring studio which fabricates bespoke, metal masterpieces with an artisanal take. This
        event is the perfect gateway into metal shaping, whether you are a craft enthusiast or an
        individual who is curious about the art of making.
      </p>
      {children}
      <div className="credits">
        This event is proudly supported by Baremetal Co. (baremetalco.com).
      </div>
    </>
  );
}
