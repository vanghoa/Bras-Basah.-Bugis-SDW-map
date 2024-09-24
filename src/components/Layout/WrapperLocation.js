import { useEffect, useRef } from "react";
const visitKey = "lastVisit";
export default function WrapperLocation({ children }) {
  console.log("rerender WrapperBody");
  const oneDay = 60 * 60 * 1000;
  const now = new Date().getTime();
  const lastVisit = +localStorage.getItem(visitKey);
  const loadAnimation = window.location.pathname === "/" && now - lastVisit > oneDay;
  const body = useRef(null);

  useEffect(() => {
    window.today = new Date().setHours(0, 0, 0, 0);
    window.onresize = () => {
      const w = window.innerWidth;
      const r = window.responsive;
      r.xxl = w <= 1536;
      r.xl = w <= 1280;
      r.lg = w <= 1024;
      r.md = w <= 768;
      r.xs = w <= 640;
    };
    const w = window.innerWidth;
    window.responsive = {
      xxl: w <= 1536,
      xl: w <= 1280,
      lg: w <= 1024,
      md: w <= 768,
      xs: w <= 640,
    };
    loadAnimation &&
      setTimeout(() => {
        const wrapper = document.querySelector(".logoloadingwrapper");
        body.current.classList.add("start");
        wrapper.ontransitionend = () => {
          body.current.classList.remove("loading");
          wrapper.ontransitionend = null;
          setTimeout(() => {
            wrapper.ontransitionend = () => {
              body.current.classList.remove("start");
              wrapper.ontransitionend = null;
              localStorage.setItem(visitKey, now);
            };
          }, 500);
        };
      }, 2000);
  }, []);
  return (
    <div ref={body} id="body" className={`${loadAnimation ? "loading" : ""}`}>
      {children}
    </div>
  );
}
