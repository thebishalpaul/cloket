import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import EditForm from "./EditForm";

function UserPage(props) {
  let userId = props.user.uid;
  const docRef = doc(db, "users", userId);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);

  async function getUserInfo() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  getUserInfo();
  return (
    <>
      <div id="nav" className="bg-Cloket flex justify-start p-4">
        <h1 className="font-syne font-semibold text-white text-5xl px-8 ">
          CLOKET
        </h1>
        <ul className="flex gap-8 text-white font-syne font-semibold  items-center mx-20">
          <li>Home</li>
          <li>About US</li>
          <li>INITIATIVE</li>
          <li>Contact</li>
          <li>Donate</li>
        </ul>
        <button
          className="bg-white  rounded-full text-xl
         w-28 mx-20 flex items-center justify-center"
        >
          Sign in
        </button>
      </div>
      <h1>User Details:</h1>
      <p>Email: {props.user.email}</p>
      <p>Name: {data.name}</p>
      <p>Phone: {data.phone}</p>
      <p>Address: {data.address}</p>
      <button
        type="submit"
        className="bg-Cloket max-lg:w-36 sm:w-24 h-auto 
        xl:text-xl sm:text-xs mx-2
        font-syne
        font-light
        text-white  
        p-3   rounded-sm  "
        onClick={() => setEdit(true)}
      >
        EDIT
      </button>
      {edit && <EditForm data={data} setEdit={setEdit} userId={userId} />}
      
      {/* <Button variant="primary" onClick={() => setEdit(true)}>
        Edit
      </Button>
      {edit && <EditForm data={data} setEdit={setEdit} userId={userId} />} */}
    </>
  );
}

export default UserPage;
