import { allInOneMapNavigate, filterCheck } from "../../utils/utils";

export default function Markers({ markerRef, filter, data }) {
  const { allPins, allPinKeys, allShowcases } = data;
  return allPinKeys.map((pin, i) => {
    const { lnglat, location, processedType, showcases } = allPins[pin];
    return (
      <div
        key={`${showcases}${location}${i}${pin}`}
        ref={(el) => (markerRef.current[pin] = el)}
        className={`marker`}
        style={{
          visibility: filterCheck(filter, processedType, location),
        }}
        onClick={() => allInOneMapNavigate(lnglat, markerRef.current[pin], pin, showcases)}
      >
        {allShowcases[showcases].pinIndex}
      </div>
    );
  });
}
