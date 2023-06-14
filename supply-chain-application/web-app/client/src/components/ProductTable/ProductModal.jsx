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
          <TextColorChanger text={data.Status} />
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
                  <p>{data.ProductId}</p>
                  <p>{data.ProductName}</p>
                  <p>{data.Price}</p>
                </div>
              </div>
              <div className="row justify-content-end col-7">
                <div className="p-2 col-4 fw-bold">Description</div>
                <div className="border-start p-2 col-8">
                  <p>{data.Description}</p>
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
                  <p>{data.Actors.ManufacturerId}</p>
                  <p>{data.Actors.DistributorId}</p>
                  <p>{data.Actors.RetailerId}</p>
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
                    {new Date(data.Dates.Manufacturered).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    {new Date(data.Dates.Distributed).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    {new Date(data.Dates.Received).toLocaleDateString("en-US")}
                  </p>
                  <p>{new Date(data.Dates.Sold).toLocaleDateString("en-US")}</p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
        <table class="table">
          <thead>
            <tr className="">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Supplier</th>
            </tr>
          </thead>
          <tbody>
            {data.Raws.map((item) => (
              <tr key={item.RawId}>
                <th scope="row">{item.RawId}</th>
                <td>{item.RawName}</td>
                <td>
                  {new Date(item.SuppliedDate).toLocaleDateString("en-US")}
                </td>
                <td>{item.SupplierId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default ProductModal;
