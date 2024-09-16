import { Fragment } from "react";

export function reCenter(lnglat) {
  window.mapRef?.flyTo({
    center: lnglat,
    zoom: 17,
    essential: true,
    padding: {
      left: getLeftPadding(),
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

export function allInOneMapNavigate(lnglat, el, pin, showcases) {
  window.openNav(!window.responsive.xs);
  hightlightEl(el);
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

export function setLeftPadding(num) {
  window.mapRef.setPadding({ left: num ?? getLeftPadding() });
}

function isBeforeOrOnToday(input) {
  const today = new Date().setHours(0, 0, 0, 0); // Reset today's time to midnight
  return input <= today;
}

function isOnToday(input) {
  const today = new Date().setHours(0, 0, 0, 0);
  return input === today;
}
