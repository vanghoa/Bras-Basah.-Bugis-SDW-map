import { Fragment } from "react";

function reCenter(lnglat) {
  window.mapRef.current?.flyTo({
    center: lnglat,
    zoom: 17,
    essential: true,
    padding: {
      left: getLeftPadding(),
      top: getTopPadding(),
      bottom: getBottomPadding(),
    },
  });
}

export function hightlightEl(el) {
  if (!el) {
    return;
  }
  el.addEventListener(
    "transitionend",
    () => {
      el.classList.remove("highlight");
    },
    { once: true }
  );
  el.classList.add("highlight");
}

export function scrollToEl(anchor, h3) {
  if (!anchor) {
    return;
  }
  setTimeout(
    () =>
      window.contentRef.scrollTo({
        top:
          anchor.offsetTop -
          (h3 ? h3.clientHeight : 0) -
          (h3 ? window.searchsttRef.current.clientHeight : 0),
        left: 0,
        behavior: "smooth",
      }),
    200
  );
}

export function removeFig() {
  const el = window.currentPin;
  window.currentPin = null;
  if (el) {
    el.onanimationend = (event) => {
      el.classList.remove("showfig", "hidefig");
      el.onanimationend = null;
    };
    el.classList.add("hidefig");
    el.classList.remove("highlight");
  }
}

export function throttle(fn, delay = 3000) {
  let lastCall = 0;

  return function (event) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(event);
    }
  };
}

export function isTouchScreen() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

export function closeAllOverlays() {
  console.log("close");
  window.setOpenCard(false);
  removeFig();
}

export function allInOneMapNavigate(lnglat, el, pin, showcases) {
  window.openNav(!window.responsive.xs);
  if (el !== window.currentPin) {
    removeFig();
    el.classList.add("showfig", "highlight");
    window.currentPin = el;
  }
  if (window.responsive.xs) {
    window.setPinCard(pin);
    window.setOpenCard(true);
  } else {
    sideMenuNavigate(showcases, el);
  }
  reCenter(lnglat);
}

export function sideMenuNavigate(showcases, el) {
  window.openNav(true);
  window.openAccordion[showcases](true);
  window.closeSearch();
  scrollToEl(el.anchor, el.h3);
  hightlightEl(el.anchor);
}

export function filterCheck(
  filter,
  processedType,
  location,
  processedLocation,
  [onbefore, on] = [null, null]
) {
  if (filter == "now") {
    return (onbefore && window.today <= onbefore) || (on && on == window.today)
      ? "visible"
      : "hidden";
  }

  return processedType[filter] ||
    filter === location ||
    filter === null ||
    processedLocation?.[filter]
    ? "visible"
    : "hidden";
}

export function getLeftPadding() {
  return window.responsive.xs ? 0 : window.widthoffset;
}

export function getBottomPadding() {
  return window.responsive.xs ? window.locationCardRef.current.clientHeight : 0;
}

export function getTopPadding() {
  return window.navRef.current.clientHeight;
}

function isBeforeOrOnToday(input) {
  const today = new Date().setHours(0, 0, 0, 0); // Reset today's time to midnight
  return input <= today;
}

function isOnToday(input) {
  const today = new Date().setHours(0, 0, 0, 0);
  return input === today;
}
