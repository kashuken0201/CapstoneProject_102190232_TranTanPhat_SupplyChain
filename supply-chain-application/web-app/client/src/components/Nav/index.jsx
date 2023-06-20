import React, { useContext } from "react";
import Avatar from "../../assets/images/Avatar.png";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/services";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="decoration-none text-black text-decoration-none"
  >
    {children}
    <i className="fa fa-angle-down ms-2"></i>
  </a>
));

function Nav() {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="col-5">
        <div className="form">
          <i className="fa fa-search" />
          <input
            type="text"
            className="form-control form-input"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <img src={Avatar} alt="" />
        <div className="ms-2">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
              Kashukiller Ken
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/" className="text-center">
                <i className="fa fa-user-circle me-3"></i>Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  logout(dispatch);
                }}
                className="text-center"
              >
                <i className="fa fa-sign-out-alt me-3"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Nav;
