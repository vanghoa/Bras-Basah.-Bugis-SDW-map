import { useEffect, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
// import { setRightPadding } from "../../utils/utils";

export default function DragHandler() {
  const nodeRef = useRef(null);
  useEffect(() => {
    window.widthoffset = window.innerWidth / 2;
  }, []);
  const handleDrag = (e, data) => {
    const percentage = Math.round((data.x / window.innerWidth) * 100);
    document.documentElement.style.setProperty(`--widthoffset`, percentage + "%");
    window.widthoffset = data.x;
  };
  return (
    <DraggableCore
      axis="x"
      bounds="parent"
      onDrag={handleDrag}
      positionOffset={{ x: "-50%", y: "-50%" }}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="draggable"></div>
    </DraggableCore>
  );
}
