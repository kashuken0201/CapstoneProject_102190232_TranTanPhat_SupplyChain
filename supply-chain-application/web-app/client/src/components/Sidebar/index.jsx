import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div
      className={`px-sm-2 px-0 background-primary sidebar ${
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
          className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none  my-3 ${
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
            <li className="nav-item my-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-home"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-box"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Product
                </span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink
                to="/raws"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-puzzle-piece"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Raw
                </span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-user-friends"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Users
                </span>
              </NavLink>
            </li>
          </ul>
          <ul
            className="nav nav-pills flex-column mt-auto align-items-center py-3 w-100"
            id="menu"
          >
            <li className="nav-item my-2">
              <NavLink
                to="/#"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-cog"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Settings
                </span>
              </NavLink>
            </li>
            <li className="nav-item my-2">
              <NavLink
                to="/#submenu1"
                data-bs-toggle="collapse"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-question-circle"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Help Center
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
