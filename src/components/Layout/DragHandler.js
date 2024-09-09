import { useEffect, useRef } from "react";
import Draggable from "react-draggable";
// import { setRightPadding } from "../../utils/utils";

export default function DragHandler() {
  const nodeRef = useRef(null);
  useEffect(() => {
    window.widthoffset = 0;
  }, []);
  const handleDrag = (e, data) => {
    document.documentElement.style.setProperty(`--widthoffset`, data.x + "px");
    window.widthoffset = data.x;
  };
  return (
    <Draggable
      axis="x"
      bounds="parent"
      onDrag={handleDrag}
      positionOffset={{ x: "-50%", y: "-50%" }}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}></div>
    </Draggable>
  );
}
