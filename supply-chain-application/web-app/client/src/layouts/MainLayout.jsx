import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

function MainLayout() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col background-gradient py-3 px-5">
          <Nav />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
