import React, { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LoginImage from "../../assets/images/login.jpeg";
import { AuthContext } from "../../context/authContext/AuthContext";
import { signIn } from "../../context/authContext/services";

export function LoginPage() {
  const { dispatch } = useContext(AuthContext);

  const [state, setState] = React.useState({
    email: "",
    password: "",
    organization: "supplier",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setState({
      ...state,
      organization: e.target.value,
    });
  };

  return (
    <Container fluid style={{ maxHeight: "100vh" }}>
      <Row className="justify-content-center align-items-center">
        <Col sm="7" className="d-none d-sm-block px-0">
          <div>
            <img
              src={LoginImage}
              alt="Login"
              className="w-100"
              style={{ height: "100vh", objectFit: "cover" }}
            />
          </div>
        </Col>
        <Col sm="5">
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 mx-auto">
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Welcome to KaSC, <br />
              This is a logistics supply chain platform
            </h3>
            <label className="mb-1">Username</label>
            <input
              className="form-control form-control-lg mb-3 rounded-0"
              type="email"
              name="email"
              onChange={handleChange}
              value={state.email}
            />
            <label className="mb-1">Password</label>
            <input
              className="form-control form-control-lg mb-3 rounded-0"
              type="password"
              name="password"
              onChange={handleChange}
              value={state.password}
            />
            <label className="mb-1">Organization</label>
            <Form.Select
              className="mb-4 rounded-0 form-control form-control-lg"
              onChange={handleSelectChange}
            >
              <option value="supplier">Supplier</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
            </Form.Select>
            <Button
              className="mb-4 px-5 w-100 rounded-0"
              color="info"
              size="lg"
              onClick={() => {
                signIn(state, dispatch);
              }}
            >
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
