import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
function EditForm(props) {
  const [name, setName] = useState(props.data.name);
  const [phone, setPhone] = useState(props.data.phone);
  const [address, setAddress] = useState(props.data.address);
  
  function editDoc(params) {
    const ref = doc(db, "users", props.userId);
    updateDoc(ref, {
      name: params.name,
      phone: params.phone,
      address: params.address
    })
    .then(() => {
      console.log(
        "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <input
        type="text"
        name=""
        id=""
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      <input
        type="number"
        name=""
        id=""
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
      <input
        type="text"
        name=""
        id=""
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        />
      <button
        className="bg-Cloket text-white font-syne"
        onClick={() => {
          editDoc({ name: name, phone: phone, address:address });
          props.setEdit(false);
        }}
      >
        Done
      </button>
    </>
  );
}

export default EditForm;