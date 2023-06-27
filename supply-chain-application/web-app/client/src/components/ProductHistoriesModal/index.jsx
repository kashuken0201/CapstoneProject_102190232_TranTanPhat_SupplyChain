import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getProductHistories } from "../../context/productHistoryContext/services";

function ProductHistoriesModal(props) {
  const { user } = useContext(AuthContext);
  const [productHistories, setData] = useState([]);
  
  useEffect(() => {
    if (user.role !== "admin") {
      getProductHistories(props.id).then((res) => setData(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          History List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
        <table className="table">
          <thead>
            <tr className="">
              <th scope="col">TxID</th>
              <th scope="col">Timestamp</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {productHistories?.map((his) => {
              return (
                <tr key={his?.TxId}>
                  <td>{his?.TxId}</td>
                  <td>{his?.Timestamp}</td>
                  <td>{his?.Record.ProductName}</td>
                  <td>{his?.Record.Price}</td>
                  <td>{his?.Record.Status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default ProductHistoriesModal;
