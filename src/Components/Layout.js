import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
// import BackToTopButton from "./Backtotop";
import { useLocation } from "react-router-dom";
import LazyLoading from "./Loading/LazyLoading";

const LazyHeader = lazy(() => import("./Header/Header"));
const LazyFooter = lazy(() => import("./Footer/Footer"));

const Layout = () => {
  const location = useLocation();

  // const isParentPortal =
  //   location.pathname === "/parentprofile" ||
  //   location.pathname === "/staffprofile" ||
  //   location.pathname === "/childprofile" ||
  //   location.pathname === "/success";

  return (
    <Suspense fallback={<LazyLoading />}>
      {/* <BackToTopButton /> */}
      <LazyHeader />
      {/* <Sidebar/> */}
      <Outlet />
     <LazyFooter />
    </Suspense>
  );
};

export default Layout;
