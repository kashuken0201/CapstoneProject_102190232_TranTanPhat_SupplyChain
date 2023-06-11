import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../context/authContext/AuthContext";
import { signIn } from "../../context/authContext/services";

export function LoginPage() {
  const { dispatch } = useContext(AuthContext);
  return (
    <Container fluid style={{ maxHeight: "100vh" }}>
      <Row className="justify-content-center align-items-center">
        <Col sm="6">
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 mx-auto">
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>

            <input
              className="form-control form-control-lg mb-3"
              type="email"
            />
            <input
              className="form-control form-control-lg mb-3"
              type="password"
            />

            <Button
              className="mb-4 px-5 w-100"
              color="info"
              size="lg"
              onClick={() => {
                signIn({}, dispatch);
              }}
            >
              Login
            </Button>
          </div>
        </Col>

        <Col sm="6" className="d-none d-sm-block px-0">
          <div>
            <img
              src="https://picsum.photos/200/300"
              alt="Login"
              className="w-100"
              style={{ height: "100vh", objectFit: "cover" }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
