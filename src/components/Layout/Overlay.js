import { Link, useParams, Navigate } from "react-router-dom";
import { LeftArrowSVG } from "../ArrowSVG";
import AllLongText from "../../json/AllLongText/Index";

export default function Overlay({ children }) {
  return (
    <div className="overlay">
      <div className="content">{children}</div>
      <Link className="toHome" to={"/"}>
        <LeftArrowSVG />
      </Link>
    </div>
  );
}

export function EventsOverlay() {
  const { name } = useParams();
  return name in AllLongText ? (
    <Overlay>{AllLongText[name]()}</Overlay>
  ) : (
    <Navigate to="/" replace />
  );
}

export function AboutOverlay() {
  const { name } = useParams();
  return <Overlay></Overlay>;
}
