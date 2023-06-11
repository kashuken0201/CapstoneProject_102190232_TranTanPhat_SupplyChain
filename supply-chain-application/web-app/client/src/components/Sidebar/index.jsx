import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div
      className={`px-sm-2 px-0 bg-dark ${
        isOpen ? "col-auto col-md-3 col-xl-2" : "col-1"
      }`}
      style={{ maxHeight: "100vh" }}
    >
      <div
        className={`d-flex flex-column align-items-center align-items-sm-start ${
          isOpen ? "px-3" : " px-0"
        } pt-2 text-white min-vh-100`}
      >
        <div
          className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none ${
            isOpen ? "justify-content-between" : "justify-content-center"
          } w-100`}
        >
          <div className={`fs-5 d-none  ${isOpen ? "d-sm-inline" : "d-none"}`}>
            Menu
          </div>
          <p
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-bars"></i>
          </p>
        </div>
        <div className="d-flex flex-column justify-content-between flex-grow-1 w-100 text-center align-items-center">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link align-middle px-0 text-white">
                <i className="fa fa-home"></i>
                <span
                  className={`ms-1 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link align-middle px-0 text-white">
                <i className="fa fa-box"></i>
                <span
                  className={`ms-1 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Product
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/raws" className="nav-link align-middle px-0 text-white">
                <i className="fa fa-puzzle-piece"></i>
                <span
                  className={`ms-1 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Raw
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link align-middle px-0 text-white">
                <i className="fa fa-user-friends"></i>
                <span
                  className={`ms-1 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Users
                </span>
              </Link>
            </li>
          </ul>
          <ul
            className="nav nav-pills flex-column mt-auto align-items-center py-3 w-100"
            id="menu"
          >
            <li className="nav-item">
              <a href="/#" className="nav-link align-middle px-0 text-white">
              <i className="fa fa-cog"></i>
                <span
                  className={`ms-1 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Settings
                </span>
              </a>
            </li>
            <li>
              <a
                href="/#submenu1"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle text-white"
              >
                <i className="fa fa-question-circle"></i>
                <span
                  className={`ms-1 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Help Center
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
