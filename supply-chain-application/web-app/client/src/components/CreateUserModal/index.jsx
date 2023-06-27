import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { UsersContext } from "../../context/userContext/UserContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { signUp } from "../../context/userContext/services";
function CreateUserModal(props) {
  const { dispatch } = useContext(UsersContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    email: "",
    password: "",
    username: "",
    address: "",
    role: "user",
    organization: user.organization,
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
          Sign up a new user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="position-relative">
        <div className="row justify-content-between my-4">
          <div className="d-flex justify-content-start col-5">
            <div className="border-end p-2 fw-bold">
              <p className="py-1">Email</p>
              <p className="py-1 mt-2">Password</p>
              <p className="py-1 mt-2">Role</p>
            </div>
            <div className="p-2">
              <p className="py-1">
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={state.email}
                />
              </p>
              <p className="py-1">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={state.password}
                />
              </p>
              <p className="py-1">user</p>
            </div>
          </div>
          <div className="row justify-content-end col-7">
            <div className="p-2 col-4 fw-bold">
              <p className="py-1">Name</p>
              <p className="py-1 mt-2">Address</p>
              <p className="py-1 mt-2">Organization</p>
            </div>
            <div className="border-start p-2 col-8">
              <p className="py-1">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={state.username}
                />
              </p>
              <p className="py-1">
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={state.address}
                />
              </p>
              <p className="py-1">{user.organization}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-5">
          <button
            className="btn btn-success"
            onClick={() => {
              signUp(dispatch, state);
              navigate("/users");
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

export default CreateUserModal;
