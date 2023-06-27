import React from "react";
import TextColorChanger from "../TextColorChanger";
import UserModal from "./UserModal";
import { subString } from "../../utils/substring";

function UserRow({ data }) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <tr>
        <td onClick={() => setModalShow(true)}>
          <i style={{ color: "blue", cursor: "pointer" }}>{subString(data._id)}</i>
        </td>
        <td>{data.username}</td>
        <td>{data.email}</td>
        <td>{data.address}</td>
        <td>
          <TextColorChanger text={data.status} />
        </td>
        <td></td>
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
