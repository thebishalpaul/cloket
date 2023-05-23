import React from 'react'
import Button from 'react-bootstrap/Button';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

function UserPage(props) {
  let userId=props.user.uid;
  // console.log(userId);
  const docRef = doc(db, "users", userId);

 async function getUserInfo(params) {
   const docSnap = await getDoc(docRef);
   console.log(docSnap);
   if (docSnap.exists()) {
     console.log("Document data:", docSnap.data());
   } else {
     // docSnap.data() will be undefined in this case
     console.log("No such document!");
   }
 }
 getUserInfo(); 
  return (
    <>
      <h1>User Details:</h1>
      <p>email: {props.user.email}</p>
      
      <Button variant="primary" type="submit" >
        Edit
      </Button>
    </>
  )
}

export default UserPage