import { useEffect } from "react";
export default function WrapperLocation({ children }) {
  console.log("rerender WrapperLocation");
  useEffect(() => {
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
  }, []);
  return <>{children}</>;
}
