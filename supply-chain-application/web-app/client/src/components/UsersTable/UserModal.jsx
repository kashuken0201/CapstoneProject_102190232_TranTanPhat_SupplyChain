import React from "react";
import { Modal } from "react-bootstrap";

function UserModal(props) {
  // const { data } = props;
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
      Hello
      </Modal.Body>
    </Modal>
  );
}

export default UserModal;
