import React, { useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ProductsContext } from "../../context/productContext/ProductContext";
import { provideProduct } from "../../context/productContext/services";
import { notify } from "../../utils/showToast";

function ChooseDistributorModal(props) {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ProductsContext);

  const [state, setState] = React.useState({
    distributor: props.distributors ? props.distributors[0] : "",
  });

  const handleSelectChange = (e) => {
    setState({
      ...state,
      distributor: e.target.value,
    });
  };

  return (
    <Modal
      {...props}
      size="l"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose your distributor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
        <div>
          <Form.Select
            className="mb-4 rounded-0 form-control form-control-lg"
            onChange={handleSelectChange}
          >
            {props.distributors?.map((distributor) => {
              return (
                <option key={distributor._id} value={distributor._id}>
                  {distributor.username}
                </option>
              );
            })}
          </Form.Select>
        </div>

        <div className="d-flex justify-content-center gap-5">
          <button
            className="btn btn-success"
            onClick={() => {
              if (user.organization === "manufacturer")
                provideProduct(dispatch, props.data._id, state.distributor);
              else
                notify(
                  "error",
                  "You are not allowed to excution this function"
                );
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

export default ChooseDistributorModal;
