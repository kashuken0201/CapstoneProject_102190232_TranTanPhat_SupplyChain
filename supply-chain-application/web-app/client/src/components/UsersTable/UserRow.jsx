import React from "react";
import TextColorChanger from "../TextColorChanger";
import UserModal from "./UserModal";

function UserRow({ data }) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <tr onClick={() => setModalShow(true)}>
        <td>{data.UserId}</td>
        <td>{data.UserName}</td>
        <td>{data.Email}</td>
        <td>{data.Address}</td>
        <td>
          <TextColorChanger text={data.Status} />
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
