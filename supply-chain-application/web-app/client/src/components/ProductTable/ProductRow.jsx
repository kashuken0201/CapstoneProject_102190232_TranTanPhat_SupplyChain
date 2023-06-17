import React from "react";
import TextColorChanger from "../TextColorChanger";
import ProductModal from "./ProductModal";
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

function ProductRow({ data }) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <tr>
        <td onClick={() => setModalShow(true)}>{subString(data._id)}</td>
        <td onClick={() => setModalShow(true)}>{data.product_name}</td>
        <td onClick={() => setModalShow(true)}>{data.price}</td>
        <td onClick={() => setModalShow(true)}>
          {new Date(data.timestamps.created_date).toLocaleDateString("en-US")}
        </td>
        <td onClick={() => setModalShow(true)}>{data.actors.manufacturer._id}</td>
        <td onClick={() => setModalShow(true)}>
          <TextColorChanger text={data.status} />
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
                <i className="fa fa-hand-holding me-3 text-info-emphasis"></i>Provide
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-cart-arrow-down me-3"></i>Order
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-truck me-3 text-warning"></i>Delivery
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-hands me-3 text-danger"></i>Receive
              </Dropdown.Item>
              <Dropdown.Item className="">
                <i className="fa fa-shopping-bag me-3 text-success"></i>Sell
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <ProductModal
        data={data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ProductRow;
