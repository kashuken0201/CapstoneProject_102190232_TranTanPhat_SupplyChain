import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const { user } = useContext(AuthContext);
  const setSideBar = () => {
    if (user.role === "user") {
      if (user.organization === "manufacturer") {
        return (
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className="nav-item my-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
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
            <li className="nav-item my-3">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-box"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Products
                </span>
              </NavLink>
            </li>
            <li className="nav-item my-3">
              <NavLink
                to="/raws"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-puzzle-piece"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Raws
                </span>
              </NavLink>
            </li>
          </ul>
        );
      }
      if (user.organization === "supplier") {
        return (
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className="nav-item my-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
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
            <li className="nav-item my-3">
              <NavLink
                to="/raws"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-puzzle-piece"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Raws
                </span>
              </NavLink>
            </li>
          </ul>
        );
      }
      if (user.organization === "distributor") {
        return (
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className="nav-item my-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
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
            <li className="nav-item my-3">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-puzzle-piece"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Products
                </span>
              </NavLink>
            </li>
          </ul>
        );
      }
      if (user.organization === "retailer") {
        return (
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className="nav-item my-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
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
            <li className="nav-item my-3">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white bg-active" : "text-gray"
                  } nav-link align-middle px-0`
                }
              >
                <i className="fa fa-puzzle-piece"></i>
                <span
                  className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
                >
                  Products
                </span>
              </NavLink>
            </li>
          </ul>
        );
      }
    }
    return (
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
        id="menu"
      >
        <li className="nav-item my-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${
                isActive ? "text-white bg-active" : "text-gray"
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
        <li className="nav-item my-3">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${
                isActive ? "text-white bg-active" : "text-gray"
              } nav-link align-middle px-0`
            }
          >
            <i className="fa fa-box"></i>
            <span
              className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
            >
              Products
            </span>
          </NavLink>
        </li>
        <li className="nav-item my-3">
          <NavLink
            to="/raws"
            className={({ isActive }) =>
              `${
                isActive ? "text-white bg-active" : "text-gray"
              } nav-link align-middle px-0`
            }
          >
            <i className="fa fa-puzzle-piece"></i>
            <span
              className={`ms-3 d-none ${isOpen ? "d-sm-inline" : "d-none"}`}
            >
              Raws
            </span>
          </NavLink>
        </li>
        <li className="nav-item my-3">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${
                isActive ? "text-white bg-active" : "text-gray"
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
    );
  };
  return (
    <div
      className={`px-sm-2 px-0 background-primary sidebar ${
        isOpen ? "col-auto col-md-3 col-xl-2 " : "col-1 sidebar-open"
      }`}
      style={{ maxHeight: "100vh" }}
    >
      <div
        className={`d-flex flex-column align-items-start ${
          isOpen ? "px-3" : " px-0"
        } pt-2 text-white min-vh-100`}
      >
        <div
          className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none  my-3 ${
            isOpen ? "justify-content-between" : "justify-content-center"
          } w-100`}
        >
          <div className={`fs-5 d-none  ${isOpen ? "d-sm-inline" : "d-none"}`}>
            KaSC
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
        <div
          className={`d-flex flex-column justify-content-between flex-grow-1 w-100 text-center ${
            isOpen ? "align-items-start" : "align-items-center"
          }`}
        >
          {setSideBar()}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
