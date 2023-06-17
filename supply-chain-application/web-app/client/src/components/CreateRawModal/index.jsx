import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import TextColorChanger from "../TextColorChanger";
import { AuthContext } from "../../context/authContext/AuthContext";
import { RawContext } from "../../context/rawContext/RawContext";
import { createRaws } from "../../context/rawContext/services";

function CreateRawModal(props) {
  const { dispatch } = useContext(RawContext);
  const { user } = useContext(AuthContext);
  const [state, setState] = React.useState({
    rawName: "",
  });
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
          Raw Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
        <div className="position-absolute top-0 end-0 p-3">
          <TextColorChanger text={"CREATED"} />
        </div>
        <div className="row justify-content-between my-4">
          <div className="d-flex justify-content-start col-5">
            <div className="border-end p-2 fw-bold">
              <p className="py-1">Raw ID</p>
              <p className="py-1">Supplier</p>
              <p className="py-1">Created Date</p>
            </div>
            <div className="p-2">
              <p className="py-1">null</p>
              <p className="py-1">{user.username}</p>
              <p className="py-1">null</p>
            </div>
          </div>
          <div className="d-flex justify-content-start col-7">
            <div className="border-end p-2 fw-bold">
              <p className="py-1">Raw Name</p>
              <p className="py-1">Manufacturer</p>
              <p className="py-1">Supplied Date</p>
            </div>
            <div className="p-2">
              <input
                type="text"
                name="rawName"
                onChange={handleChange}
                value={state.rawName}
              />
              <p className="py-1">null</p>
              <p className="py-1">null</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-5">
          <button className="btn btn-success" onClick={()=>{
            createRaws(dispatch,state.rawName)
          }}>OK</button> 
          <button className="btn btn-danger" onClick={props.onHide}>Cancel</button> 
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateRawModal;
