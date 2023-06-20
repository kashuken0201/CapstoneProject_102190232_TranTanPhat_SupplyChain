import React from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import TextColorChanger from "../TextColorChanger";

function ProductModal(props) {
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
                  <p>
                    {data.actors.manufacturer
                      ? data.actors.manufacturer.username
                      : "No available"}
                  </p>
                  <p>
                    {data.actors.distributor
                      ? data.actors.distributor.username
                      : "No available"}
                  </p>
                  <p>
                    {data.actors.retailer
                      ? data.actors.retailer.username
                      : "No available"}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-start col-7">
                <div className="border-end p-2 fw-bold">
                  <p>Manufactured Date</p>
                  <p>Ordered Date</p>
                  <p>Distributed Date</p>
                  <p>Received Date</p>
                  <p>Sold Date</p>
                </div>
                <div className="p-2">
                  <p>
                    {data.timestamps.created_date
                      ? new Date(
                          data.timestamps.created_date
                        ).toLocaleDateString("en-US")
                      : "No available"}
                  </p>
                  <p>
                    {data.timestamps.ordered_date
                      ? new Date(
                          data.timestamps.ordered_date
                        ).toLocaleDateString("en-US")
                      : "No available"}
                  </p>
                  <p>
                    {data.timestamps.delivered_date
                      ? new Date(
                          data.timestamps.delivered_date
                        ).toLocaleDateString("en-US")
                      : "No available"}
                  </p>
                  <p>
                    {data.timestamps.received_date
                      ? new Date(
                          data.timestamps.received_date
                        ).toLocaleDateString("en-US")
                      : "No available"}
                  </p>
                  <p>
                    {data.timestamps.sold_date
                      ? new Date(data.timestamps.sold_date).toLocaleDateString(
                          "en-US"
                        )
                      : "No available"}
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
            {data.raws
              ? data.raws.map((item) => {
                  return (
                    <tr key={item?._id}>
                      <th scope="row">{item?._id}</th>
                      <td>{item?.raw_name}</td>
                      <td>
                        {new Date(item?.created_date).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                      <td>{item?.supplier?.username}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
