import { allInOneMapNavigate, filterCheck } from "../../utils/utils";
import Img from "../../img/Img";

export default function Markers({ markerRef, filter, data }) {
  const { allPins, allPinKeys, allShowcases } = data;
  return allPinKeys.map((pin, i) => {
    const { lnglat, location, processedType, showcases, lastDate } = allPins[pin];
    return (
      <div
        key={`${showcases}${location}${i}${pin}`}
        ref={(el) => (markerRef.current[pin] = el)}
        className={`marker`}
        style={{
          visibility: filterCheck(filter, processedType, location, null, [lastDate, null]),
        }}
        onClick={() => allInOneMapNavigate(lnglat, markerRef.current[pin], pin, showcases)}
      >
        {allShowcases[showcases].pinIndex}
        {Array.from({ length: 3 }, (v, i) => (
          <Img key={i} className={`fig _${i}`} src={`${showcases}${i + 1}`} />
        ))}
      </div>
    );
  });
}
