import React from "react";
import { Modal } from "react-bootstrap";
import TextColorChanger from "../TextColorChanger";

function RawModal(props) {
  const { data } = props;
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
          <TextColorChanger text={data.Status} />
        </div>
        <div className="row justify-content-between">
          <div className="d-flex justify-content-start col-5">
            <div className="border-end p-2 fw-bold">
              <p>Raw ID</p>
              <p>Supplier</p>
              <p>Created Date</p>
            </div>
            <div className="p-2">
              <p>{data.RawId}</p>
              <p>{data.SupplierId}</p>
              <p>{new Date(data.CreateDate).toLocaleDateString("en-US")}</p>
            </div>
          </div>
          <div className="d-flex justify-content-start col-7">
            <div className="border-end p-2 fw-bold">
              <p>Raw Name</p>
              <p>Manufacturer</p>
              <p>Supplied Date</p>
            </div>
            <div className="p-2">
              <p>
                {data.RawName}
              </p>
              <p>{data.ManufacturerId}</p>
              <p>{new Date(data.SuppliedDate).toLocaleDateString("en-US")}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RawModal;
