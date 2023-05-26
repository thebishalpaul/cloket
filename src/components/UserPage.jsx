import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import EditForm from "./EditForm";
import image from "./icon.png";

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
        <ul
          className="flex gap-8 text-white font-syne font-semibold 
         items-center mx-20 text-lg"
        >
          <li>HOME</li>
          <li> BUY</li>
          <li>INITIATIVE</li>
          <li>CONTACT</li>
          <li>SWAP</li>
        </ul>
        <button
          className="bg-white  rounded-md text-xl
         w-2/5 mx-20 flex items-center font-syne justify-center"
        >
          Sign in
        </button>
      </div>
      <div className="main flex justify-center items-center gap-14 mt-16">
        <img src={image} className="w-40"></img>
        <div className="user-info flex flex-col font-syne font-bold  ">
          <p className="font-syne text-4xl mb-1">{data.name}</p>
          <p className="font-syne text-2xl mb-1 text-Cloket">
            +91-{data.phone}
          </p>
          <p
            className="underline underline-offset-4 mb-2 text-Cloket text-2xl
           "
          >
            {props.user.email}
          </p>
          <p className="font-syne text-sm font-light w-60 ">
            Lorem ipsum dolor sit amet consectetuc
          </p>

          <button
            type="submit"
            className="bg-Cloket 
            text-xl text-white w-4/12 
            mx-40  "
            onClick={() => setEdit(true)}
          >
            EDIT
          </button>
        </div>
      </div>
      {/* <h1>User Details:</h1>
      <p>Email: {props.user.email}</p>
      <p>Name: {data.name}</p>
      <p>Phone: {data.phone}</p> */}
      {/* <button
        type="submit"
        className="bg-Cloket max-lg:w-36 sm:w-24 h-auto 
        xl:text-xl sm:text-xs mx-2
        font-syne
        font-light
        text-white  
        p-3   rounded-sm flex items-center justify-center "
        onClick={() => setEdit(true)}
      >
        NEXT
      </button> */}
      {edit && <EditForm data={data} setEdit={setEdit} userId={userId} />}

      {/* <Button variant="primary" onClick={() => setEdit(true)}>
        Edit
      </Button>
      {edit && <EditForm data={data} setEdit={setEdit} userId={userId} />} */}
    </>
  );
}

export default UserPage;
