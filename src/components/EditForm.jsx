import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'
function EditForm(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  function editDoc(params) {
    const ref = doc(db, "users", props.userId);
    updateDoc(ref, {
      name: params.name,
      phone: params.phone
    })
      .then(() => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
        console.log(error);
      })
    
  }
  return (
    <>
      <h6>Edit Fields</h6>
      <input type="text" name="" id="" placeholder='name' onChange={(e) => setName(e.target.value)} />
      <input type="number" name="" id="" placeholder="phone" onChange={(e) =>
        setPhone(e.target.value)} />
      <button onClick={() => {
        editDoc({ name: name, phone: phone })
        props.setEdit(false)
      }}>Done</button>
    
      
    </>
  )
}

export default EditForm