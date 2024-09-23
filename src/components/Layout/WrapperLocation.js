import { useEffect } from "react";
export default function WrapperLocation({ children }) {
  console.log("rerender WrapperLocation");
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
    const firstVisitKey = "firstVisit";
    if (window.location.pathname === "/" && !localStorage.getItem(firstVisitKey)) {
      setTimeout(() => {
        const root = document.querySelector("#root");
        const wrapper = document.querySelector(".logoloadingwrapper");
        root.classList.add("start");
        wrapper.ontransitionend = () => {
          root.classList.remove("loading");
          wrapper.ontransitionend = null;
          setTimeout(() => {
            wrapper.ontransitionend = () => {
              root.classList.remove("start");
              wrapper.ontransitionend = null;
              localStorage.setItem(firstVisitKey, "false");
            };
          }, 500);
        };
      }, 2000);
    } else {
      setTimeout(() => {
        document.querySelector("#root").classList.remove("loading");
      }, 10);
    }
  }, []);
  return <>{children}</>;
}
