import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import EditForm from "./EditForm";
import image from "./icon.png";
import NavBar from "./NavBar";
import { IoIosMenu } from "react-icons/io";
import { BsCartFill } from "react-icons/fa";

function UserPage(props) {
  let userId = props.user.uid;
  const docRef = doc(db, "users", userId);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  

  async function getUserInfo() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  }
  useEffect(() => {
    getUserInfo();
  }, [data]);
  // const runBothFunctions = () => {
  //   setShowModal(true);
  //   setEdit(true);
  // };

  return (
    <>
      <NavBar></NavBar>

      {/* MODAL */}
      {/* {showModal ? (
        <>
          <div
            className="justify-center font-syne items-center flex overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl"> */}
      {/*content*/}
      {/* <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white 
                outline-none focus:outline-none"
              > */}
      {/*header*/}
      {/* <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">EDIT PROFILE</h3>
                 
                </div> */}
      {/*body*/}
      {/* <div className="relative p-6 flex-auto">
                  {edit && (
                    <EditForm data={data} setEdit={setEdit} userId={userId} />
                  )}
                </div> */}
      {/*footer*/}
      {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-Cloket text-white active:bg-purple-700 font-syne font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} */}

      {/* MODAL */}

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
          <p className="font-syne text-sm font-light w-60 ">{data.address}</p>

          <button
            type="submit"
            className="bg-Cloket 
            text-xl text-white w-4/12 
            mx-40  "
            //onClick={} ! Eikhane pass korte hobe
            // onClick={() => setShowModal(true) setEdit(true)}
            // // onClick={() => setEdit(true)}
          >
            EDIT
          </button>
        </div>
      </div>
    </>
  );
}

export default UserPage;
