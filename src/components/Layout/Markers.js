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
          <div
            key={i}
            className={`fig _${i}`}
            style={{
              "--de": `${(Math.random() * 0.49 + 0.01).toFixed(2)}s`,
              "--du": `${(Math.random() * 0.5 + 0.7).toFixed(2)}s`,
              "--r1": `-${(Math.random() * 200 + 10).toFixed(2)}deg`,
              "--r2": `${(Math.random() * 240 + 10).toFixed(2)}deg`,
              "--y1": `${(Math.random() * 40 - 20).toFixed(2)}%`,
              "--y2": `${(Math.random() * 40 - 20).toFixed(2)}%`,
            }}
          >
            <Img src={`${showcases}${i + 1}`} />
          </div>
        ))}
      </div>
    );
  });
}
