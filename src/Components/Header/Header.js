import React, { useState, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const listContainer = useRef(null);
  const gsContainer = useRef(null);
  const bsContainer = useRef(null);
  const list = useRef(null);
  const listNav = useRef(null);
  const btn = useRef(null);
  const sections = [
    { id: "home", label: "HOME", to: "/", dropdown: null },
    { id: "dashboard", label: "DASHBOARD", to: "/profile", dropdown: null },
    // { id: "contact", label: "CONTACT", to: "/contact", dropdown: null },
   
  ];

  const showNavbar = () => {
    const listCont = listContainer.current;
    const gsCont = gsContainer.current;
    const bsCont = bsContainer.current;

    const listt = list.current;
    const btnn = btn.current;
    const listContHeight = listCont.getBoundingClientRect().height;
    const gsContHeight = gsCont.getBoundingClientRect().height;
    const bsHeight = bsCont.getBoundingClientRect().height;

    const listHeight = listt.getBoundingClientRect().height;
    console.log(listContHeight, listHeight);
    if (listContHeight === 0) {
      listCont.style.height = `${listHeight}px`;
      gsCont.style.height = `${bsHeight}px`;
    } else {
      listCont.style.height = 0;
      gsCont.style.height = 0;
    }

    btnn.classList.toggle("active");
  };

  const location = useLocation();

  // Check if the current location pathname is the enrollment page
  const isEnrollmentPage = location.pathname === "/enrol";

  const [openDropdown, setOpenDropdown] = useState(null);
  // const listContainer = useRef(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };
 

    // Function to check if the link matches the current page
     const [activePage, setActivePage] = useState("");

     // Set activePage state based on current location
     React.useEffect(() => {
       setActivePage(location.pathname);
     }, [location]);
  

  return (
    <>
      <div className="header-wrapper">
        <div className="container">
          <nav className="d-flex justify-content-between align-items-center py-3">
            <div className="nav-bar">
              <Link to={"/"}>
                <svg
                  id="logo-16"
                  className="logooo"
                  width="100"
                  height="48"
                  viewBox="0 0 109 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M64.9315 11.4284C62.1883 8.6852 58.9316 6.5091 55.3475 5.0245C51.7633 3.5399 47.9219 2.7758 44.0424 2.7758C40.1629 2.7758 36.3215 3.5399 32.7373 5.0245C29.1532 6.5091 25.8965 8.6852 23.1533 11.4284L44.0424 32.3174L64.9315 11.4284Z"
                    class="ccompli1"
                    fill="#FFD200"
                  ></path>{" "}
                  <path
                    d="M44.0686 32.3475C46.8118 35.0907 50.0684 37.2667 53.6526 38.7513C57.2367 40.2359 61.0782 41 64.9577 41C68.837 41 72.679 40.2359 76.263 38.7513C79.847 37.2667 83.104 35.0907 85.847 32.3475L64.9577 11.4584L44.0686 32.3475Z"
                    class="ccompli2"
                    fill="#06E07F"
                  ></path>{" "}
                  <path
                    d="M44.017 32.3429C41.2738 35.0861 38.0171 37.2621 34.433 38.7467C30.8488 40.2313 27.0074 40.9954 23.1279 40.9954C19.2484 40.9954 15.407 40.2313 11.8228 38.7467C8.2387 37.2621 4.982 35.0861 2.2388 32.3429L23.1279 11.4538L44.017 32.3429Z"
                    class="ccustom"
                    fill="#E3073C"
                  ></path>{" "}
                  <path
                    d="M64.9831 11.433C67.726 8.6898 70.983 6.5138 74.567 5.0292C78.151 3.5446 81.993 2.7805 85.872 2.7805C89.752 2.7805 93.593 3.5446 97.177 5.0292C100.761 6.5138 104.018 8.6898 106.761 11.433L85.872 32.3221L64.9831 11.433Z"
                    class="ccustom"
                    fill="#1F84EF"
                  ></path>{" "}
                </svg>
              </Link>
              <button className="btn mb-0" onClick={showNavbar} ref={btn}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            </div>
            <div className="list-container mb-0" ref={listContainer}>
              <ul className="list d-flex px-0" ref={list}>
                {sections.map((section) => (
                  <li
                    className="dropdown"
                    key={section.id}
                    onMouseLeave={handleMouseLeave}
                  >
                    {section.dropdown !== null ? (
                      <Link
                        to={section.to}
                        onMouseOver={() => handleDropdownToggle(section.id)}
                        className={`link-with-arrow${
                          section.to === activePage ? " active" : ""
                        } d-none d-md-flex`}
                        // Apply the class conditionally based on activePage
                      >
                        {section.label}
                        {openDropdown === section.id ? (
                          <span className="material-symbols-outlined">
                            arrow_drop_down
                          </span>
                        ) : (
                          <span className="material-symbols-outlined">
                            arrow_drop_up
                          </span>
                        )}
                      </Link>
                    ) : (
                      <Link
                        to={section.to}
                        className={`link-with-arrow${
                          section.to === activePage ? " active" : ""
                        }`}
                        // Apply the class conditionally based on activePage
                      >
                        {section.label}
                      </Link>
                    )}
                    {openDropdown === section.id && section.dropdown && (
                      <div className="dropdown-content ">
                        {section.dropdown.map((item, index) => (
                          <Link
                            to={item.to}
                            key={index}
                            className={`link-with-arroww${
                              item.to === activePage ? " active" : ""
                            }`}
                            // Apply the class conditionally based on activePage
                          >
                            <p className="mb-0 arrow-item">{item.label}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              
              </ul>
            </div>
            <div className="gs-container" ref={gsContainer}>
              <Link to={"/login"}>
                {" "}
                <button
                  className="get-started"
                  ref={bsContainer}
                  disabled={isEnrollmentPage}
                >
                  Login
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
