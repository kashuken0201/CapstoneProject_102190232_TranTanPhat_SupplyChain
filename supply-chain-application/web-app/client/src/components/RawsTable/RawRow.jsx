import React from "react";
import TextColorChanger from "../TextColorChanger";
import RawModal from "./RawModal";
import { Dropdown } from "react-bootstrap";

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
      <tr>
        <td onClick={() => setModalShow(true)}>{data.RawId}</td>
        <td onClick={() => setModalShow(true)}>{data.RawName}</td>
        <td onClick={() => setModalShow(true)}>{new Date(data.CreateDate).toLocaleDateString("en-US")}</td>
        <td onClick={() => setModalShow(true)}>{data.SupplierId}</td>
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
                <i class="fa fa-pen me-3 text-info"></i>Edit
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
