import { Header } from "../header/header";
import { Outlet } from "react-router-dom";
import React from "react";

export const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};
