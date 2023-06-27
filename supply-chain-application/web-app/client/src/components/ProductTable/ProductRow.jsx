import React, { useContext } from "react";
import TextColorChanger from "../TextColorChanger";
import { Dropdown } from "react-bootstrap";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ProductsContext } from "../../context/productContext/ProductContext";
import {
  orderProduct,
  deliverProduct,
  receiveProduct,
  sellProduct,
  verifyProduct,
} from "../../context/productContext/services";
import ProductModal from "./ProductModal";
import ChooseDistributorModal from "../ChooseDistributorModal";
import ProductHistoriesModal from "../../components/ProductHistoriesModal";
import { notify } from "../../utils/showToast";
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

function ProductRow(props) {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ProductsContext);

  const [hisModalShow, setHisModalShow] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [chooseDistributorModalShow, setChooseDistributorModalShow] =
    React.useState(false);

  const setButton = () => {
    if (user.organization === "manufacturer")
      return (
        <Dropdown.Item
          className=""
          onClick={() => {
            if (user.organization === "manufacturer") {
              setChooseDistributorModalShow(true);
            } else
              notify("error", "You are not allowed to excution this function");
          }}
        >
          <i className="fa fa-hand-holding me-3 text-info-emphasis"></i>
          Provide
        </Dropdown.Item>
      );
    if (user.organization === "distributor")
      return (
        <Dropdown.Item
          className=""
          onClick={() => {
            if (user.organization === "distributor")
              deliverProduct(dispatch, props.data._id);
            else
              notify("error", "You are not allowed to excution this function");
          }}
        >
          <i className="fa fa-truck me-3 text-warning"></i>Deliver
        </Dropdown.Item>
      );
    return (
      <div>
        <Dropdown.Item
          className=""
          onClick={() => {
            if (user.organization === "retailer")
              orderProduct(dispatch, props.data._id);
            else
              notify("error", "You are not allowed to excution this function");
          }}
        >
          <i className="fa fa-cart-arrow-down me-3"></i>Order
        </Dropdown.Item>

        <Dropdown.Item
          className=""
          onClick={() => {
            if (user.organization === "retailer")
              receiveProduct(dispatch, props.data._id);
            else
              notify("error", "You are not allowed to excution this function");
          }}
        >
          <i className="fa fa-hands me-3 text-danger"></i>Receive
        </Dropdown.Item>
        <Dropdown.Item
          className=""
          onClick={() => {
            if (user.organization === "retailer")
              sellProduct(dispatch, props.data._id);
            else
              notify("error", "You are not allowed to excution this function");
          }}
        >
          <i className="fa fa-shopping-bag me-3 text-success"></i>
          Sell
        </Dropdown.Item>
      </div>
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
            <Dropdown.Item
              className=""
              onClick={() => {
                setHisModalShow(true);
              }}
            >
              <i className="fa fa-history me-3"></i>History
            </Dropdown.Item>
            {setButton()}
            <Dropdown.Item
              className=""
              onClick={() => {
                verifyProduct(dispatch, props.data._id);
              }}
            >
              <i className="fa fa-check me-3 text-success"></i>Verify
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };
  return (
    <>
      <tr>
        <td onClick={() => setModalShow(true)}>
          <i style={{ color: "blue", cursor: "pointer" }}>
            {subString(props.data._id)}
          </i>
        </td>
        <td>{props.data.product_name}</td>
        <td>{props.data.price}</td>
        <td>
          {new Date(props.data.timestamps.created_date).toLocaleDateString(
            "en-US"
          )}
        </td>
        <td>{props.data.actors.manufacturer?.username}</td>
        <td>
          <TextColorChanger text={props.data.status} />
        </td>
        <td>{setAction()}</td>
      </tr>
      <ProductModal
        data={props.data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ChooseDistributorModal
        data={props.data}
        distributors={props.distributors}
        show={chooseDistributorModalShow}
        onHide={() => setChooseDistributorModalShow(false)}
      />
      <ProductHistoriesModal
        id={props.data._id}
        show={hisModalShow}
        onHide={() => setHisModalShow(false)}
      />
    </>
  );
}

export default ProductRow;
