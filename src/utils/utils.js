export function reCenter(lnglat) {
  window.mapRef?.flyTo({
    center: lnglat,
    zoom: 17,
    essential: true,
    padding: {
      right: getRightPadding(),
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

export function scrollToEl(el) {
  if (!el) {
    return;
  }
  const parent = el.offsetParent;
  parent.scrollTo({
    top: el.offsetTop - 36,
    left: 0,
    behavior: "smooth",
  });
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
  scrollToEl(el.anchor);
  hightlightEl(el.anchor);
}

export function filterCheck(filter, processedType, location, processedLocation) {
  return processedType[filter] ||
    filter === location ||
    filter === null ||
    processedLocation?.[filter]
    ? "visible"
    : "hidden";
}

export function getRightPadding() {
  return window.responsive.xs ? 0 : window.innerWidth / 2 - window.widthoffset;
}

export function setRightPadding(num) {
  window.mapRef.setPadding({ right: num ?? getRightPadding() });
}
