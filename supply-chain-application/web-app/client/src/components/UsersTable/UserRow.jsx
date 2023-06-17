import React from "react";
import TextColorChanger from "../TextColorChanger";
import UserModal from "./UserModal";

function UserRow({ data }) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <tr onClick={() => setModalShow(true)}>
        <td>{data._id}</td>
        <td>{data.username}</td>
        <td>{data.email}</td>
        <td>{data.address}</td>
        <td>
          <TextColorChanger text={data.status} />
        </td>
        <td>...</td>
      </tr>
      <UserModal
        data={data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default UserRow;
