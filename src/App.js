import { useEffect } from "react";
import WrapperMapbox from "./components/Layout/Mapbox";
import WrapperLocation from "./components/Layout/WrapperLocation";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { polyfill } from "smoothscroll-polyfill";
import { EventsOverlay, FridayOverlay } from "./components/Layout/Overlay";
import { AboutOverlay } from "./components/Layout/AboutOverlay";

function App() {
  useEffect(() => {
    window.__forceSmoothScrollPolyfill__ = true;
    polyfill();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WrapperMain />}>
          <Route path="friday/:name" element={<FridayOverlay />} />
          <Route path="events/:name" element={<EventsOverlay />} />
          <Route path="about/:name?" element={<AboutOverlay />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function WrapperMain() {
  return (
    <WrapperLocation>
      <WrapperMapbox>
        <Outlet />
      </WrapperMapbox>
    </WrapperLocation>
  );
}

export default App;
