import React, { useContext, useEffect } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import TextColorChanger from "../TextColorChanger";
import { RawContext } from "../../context/rawContext/RawContext";
import { getRaws } from "../../context/rawContext/services";

function ProductModal(props) {
  const { dispatch, raws } = useContext(RawContext);
  useEffect(() => {
    getRaws(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          Product Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
        <div className="position-absolute top-0 end-0 p-3">
          <TextColorChanger text={data.status} />
        </div>
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="general" title="General">
            <div className="row justify-content-between">
              <div className="d-flex justify-content-start col-5">
                <div className="border-end p-2 fw-bold">
                  <p>Product ID</p>
                  <p>Product Name</p>
                  <p>Price</p>
                </div>
                <div className="p-2">
                  <p>{data._id}</p>
                  <p>{data.product_name}</p>
                  <p>{data.price}</p>
                </div>
              </div>
              <div className="row justify-content-end col-7">
                <div className="p-2 col-4 fw-bold">Description</div>
                <div className="border-start p-2 col-8">
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="other" title="Other">
            <div className="row justify-content-between">
              <div className="d-flex justify-content-start col-5">
                <div className="border-end p-2 fw-bold">
                  <p>Manufacturer</p>
                  <p>Distributor</p>
                  <p>Retailer</p>
                </div>
                <div className="p-2">
                  <p>{data.actors.manufacturer._id}</p>
                  <p>{data.actors.manufacturer._id}</p>
                  <p>{data.actors.manufacturer._id}</p>
                </div>
              </div>
              <div className="d-flex justify-content-start col-7">
                <div className="border-end p-2 fw-bold">
                  <p>Manufactured Date</p>
                  <p>Distributed Date</p>
                  <p>Received Date</p>
                  <p>Sold Date</p>
                </div>
                <div className="p-2">
                  <p>
                    {new Date(data.timestamps.created_date).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    {new Date(data.timestamps.created_date).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    {new Date(data.timestamps.created_date).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    {new Date(data.timestamps.created_date).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
        <table className="table">
          <thead>
            <tr className="">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {data.raws.map((item) => {
              const raw = raws.find((rawitem) => rawitem._id === item);
              return (
                <tr key={raw._id}>
                  <th scope="row">{raw._id}</th>
                  <td>{raw.raw_name}</td>
                  <td>{new Date(raw.created_date).toLocaleDateString("en-US")}</td>
                  <td>{raw.supplier.username}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
