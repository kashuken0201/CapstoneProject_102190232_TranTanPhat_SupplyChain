import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import TextColorChanger from "../TextColorChanger";
import { ProductsContext } from "../../context/productContext/ProductContext";
import { RawContext } from "../../context/rawContext/RawContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getRaws } from "../../context/rawContext/services";
import { createProduct } from "../../context/productContext/services";

function CreateProductModal(props) {
  const { dispatch } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);
  const { dispatch: rawDispatch, raws } = useContext(RawContext);

  const [state, setState] = React.useState({
    product_name: "",
    price: "",
    description: "",
    raws: [],
  });

  useEffect(() => {
    getRaws(rawDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setState({
        ...state,
        raws: [...state.raws, value],
      });
    } else {
      setState({
        ...state,
        raws: state.raws.filter((item) => item !== value),
      });
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
        <div className="position-absolute top-0 end-0 p-3">
          <TextColorChanger text={"CREATING"} />
        </div>
        <div className="row justify-content-between my-4">
          <div className="d-flex justify-content-start col-5">
            <div className="border-end p-2 fw-bold">
              <p className="py-1">Product ID</p>
              <p className="py-1">Product Name</p>
              <p className="py-1">Price</p>
            </div>
            <div className="p-2">
              <p className="py-1">No available</p>
              <p className="py-1">
                <input
                  type="text"
                  name="product_name"
                  onChange={handleChange}
                  value={state.product_name}
                />
              </p>
              <p className="py-1">
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={state.price}
                />
              </p>
            </div>
          </div>
          <div className="row justify-content-end col-7">
            <div className="p-2 col-4 fw-bold">Description</div>
            <div className="border-start p-2 col-8">
              <p>
                <textarea
                  type="text"
                  name="description"
                  rows={4}
                  onChange={handleChange}
                  value={state.description}
                />
              </p>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="">
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {raws?.map((raw) => {
              if (raw?.manufacturer?._id === user.id) {
                return (
                  <tr key={raw?._id}>
                    <th scope="row">
                      <label>
                        <input
                          type="checkbox"
                          value={raw?._id}
                          checked={state.raws?.includes(raw?._id)}
                          onChange={handleCheckboxChange}
                        />
                      </label>
                    </th>
                    <td>{raw?.raw_name}</td>
                    <td>
                      {new Date(raw?.created_date).toLocaleDateString("en-US")}
                    </td>
                    <td>{raw?.supplier.username}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-center gap-5">
          <button
            className="btn btn-success"
            onClick={() => {
              createProduct(dispatch, state);
              props.onHide();
            }}
          >
            OK
          </button>
          <button className="btn btn-danger" onClick={props.onHide}>
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateProductModal;
