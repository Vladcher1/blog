import { Header } from "../header/header";
import { Outlet } from "react-router-dom";
import React from "react";
import "./layout.scss";
import Spinner from "../spinner/spinner";
import { useSelector } from "react-redux";
import { StateI } from "../../types";

export const Layout: React.FC = () => {
  const status = useSelector((state: StateI) => state.user.status);

  return (
    <React.Fragment>
      <Header />
      <div className="layout-container ">
        {status === "loading" ? <Spinner /> : <Outlet />}
      </div>
    </React.Fragment>
  );
};
