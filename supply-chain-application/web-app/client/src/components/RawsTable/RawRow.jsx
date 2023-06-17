import React from "react";
import TextColorChanger from "../TextColorChanger";
import RawModal from "./RawModal";
import { Dropdown } from "react-bootstrap";
import { subString } from "../../utils/substring";

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
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <tr className="rounded-3">
        <td onClick={() => setModalShow(true)}>{subString(data._id)}</td>
        <td onClick={() => setModalShow(true)}>{data.raw_name}</td>
        <td onClick={() => setModalShow(true)}>
          {new Date(data.created_date).toLocaleDateString("en-US")}
        </td>
        <td onClick={() => setModalShow(true)}>{data.supplier.username}</td>
        <td onClick={() => setModalShow(true)}>
          <TextColorChanger text={data.Status} />
        </td>
        <td>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
              ...
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/" className="">
                <i className="fa fa-pen me-3 text-info"></i>Edit
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-history me-3"></i>History
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-hand-holding me-3 text-info-emphasis"></i>
                Provide
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-cart-arrow-down me-3"></i>Order
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
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
