import { memo } from "react";

const SearchSVG = memo(function SearchSVG() {
  return <div className="leftbtn"></div>;
});

const RightBtn = memo(function ({ className = "" }) {
  return <div className={`rightbtn ${className}`}></div>;
});

const GeolocateSVG = memo(function () {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 0C12.4556 0 12.8322 0.338585 12.8918 0.777875L12.9 0.9L12.8989 3.04525C17.1514 3.46509 20.5349 6.84862 20.9559 11.103L21 11.1H23.1C23.5971 11.1 24 11.5029 24 12C24 12.4556 23.6614 12.8322 23.2221 12.8918L23.1 12.9L20.954 12.8988C20.5349 17.1514 17.1514 20.5349 12.897 20.9559L12.9 21V23.1C12.9 23.5971 12.4971 24 12 24C11.5444 24 11.1678 23.6614 11.1082 23.2221L11.1 23.1L11.1012 20.954C6.84862 20.5349 3.46509 17.1514 3.04414 12.897L3 12.9H0.9C0.402944 12.9 0 12.4971 0 12C0 11.5444 0.338585 11.1678 0.777875 11.1082L0.9 11.1L3.04525 11.1011C3.46509 6.84862 6.84862 3.46509 11.103 3.04414L11.1 3V0.9C11.1 0.402944 11.5029 0 12 0ZM12 4.8C8.02355 4.8 4.8 8.02355 4.8 12C4.8 15.9765 8.02355 19.2 12 19.2C15.9765 19.2 19.2 15.9765 19.2 12C19.2 8.02355 15.9765 4.8 12 4.8ZM12 7.2C14.651 7.2 16.8 9.34903 16.8 12C16.8 14.651 14.651 16.8 12 16.8C9.34903 16.8 7.2 14.651 7.2 12C7.2 9.34903 9.34903 7.2 12 7.2Z"
        fill="#212121"
      />
    </svg>
  );
});

const RecenterSVG = memo(function () {
  return (
    <svg viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 18H18V70" stroke="black" strokeWidth="36" />
      <path d="M94 146L146 146L146 94" stroke="black" strokeWidth="36" />
      <path d="M146 70L146 18L94 18" stroke="black" strokeWidth="36" />
      <path d="M18 94L18 146L70 146" stroke="black" strokeWidth="36" />
    </svg>
  );
});

export { SearchSVG, RightBtn, GeolocateSVG, RecenterSVG };
