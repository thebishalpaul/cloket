import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import EditForm from './EditForm';

function UserPage(props) {
  let userId = props.user.uid;
  const docRef = doc(db, "users", userId);
  const [data, setData] = useState("");
  const [edit,setEdit]=useState(false);

  async function getUserInfo() {
    useEffect(()=>{

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    },[])
  }
  getUserInfo();
  return (
    <>
      <h1>User Details:</h1>
      <p>Email: {props.user.email}</p>
      <p>Name: {data.name}</p>
      <p>Phone: {data.phone}</p>
      <Button variant="primary" onClick={setEdit(true)}>Edit</Button>
        {edit && <EditForm/>}
   </>
  )
}

export default UserPage