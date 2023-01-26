import { Header } from "../header/header";
import { Outlet } from "react-router-dom";
import React from "react";
import "./layout.scss";

export const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="layout-container">
        <Outlet />
      </div>
    </React.Fragment>
  );
};
