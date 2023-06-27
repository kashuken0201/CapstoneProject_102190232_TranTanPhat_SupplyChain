import React, { useContext } from "react";
import TextColorChanger from "../TextColorChanger";
import { Dropdown } from "react-bootstrap";
import RawModal from "./RawModal";
import { RawContext } from "../../context/rawContext/RawContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { orderRaw, supplyRaw } from "../../context/rawContext/services";
import { subString } from "../../utils/substring";
import { notify } from "../../utils/showToast";

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
  </a>
));

function RawRow({ data }) {
  const { dispatch } = useContext(RawContext);
  const { user } = useContext(AuthContext);

  const [modalShow, setModalShow] = React.useState(false);

  const setButton = () => {
    if (user.organization === "manufacturer") {
      return (
        <Dropdown.Item
          className=""
          onClick={() => {
            if (user.organization === "manufacturer")
              orderRaw(dispatch, data._id);
            else
              notify("error", "You are not allowed to excution this function");
          }}
        >
          <i className="fa fa-cart-arrow-down me-3"></i>Order
        </Dropdown.Item>
      );
    }
    return (
      <Dropdown.Item
        className=""
        onClick={() => {
          if (user.organization === "supplier") supplyRaw(dispatch, data._id);
          else notify("error", "You are not allowed to excution this function");
        }}
      >
        <i className="fa fa-hand-holding me-3 text-info-emphasis"></i>
        Provide
      </Dropdown.Item>
    );
  };
  const setAction = () => {
    if (user.role !== "admin") {
      return (
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
            <b>...</b>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* <Dropdown.Item className="">
              <i className="fa fa-history me-3"></i>History
            </Dropdown.Item> */}
            {setButton()}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };
  return (
    <>
      <tr className="rounded-3">
        <td onClick={() => setModalShow(true)}>
          <i style={{ color: "blue", cursor: "pointer" }}>
            {subString(data._id)}
          </i>
        </td>
        <td>{data.raw_name}</td>
        <td>{new Date(data.created_date).toLocaleDateString("en-US")}</td>
        <td>{data.supplier?.username}</td>
        <td>
          <TextColorChanger text={data.status} />
        </td>
        <td>{setAction()}</td>
      </tr>
      <RawModal
        data={data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default RawRow;
