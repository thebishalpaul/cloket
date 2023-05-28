import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import EditForm from "./EditForm";
import image from "./icon.png";
import { IoIosMenu } from "react-icons/io";
import { BsCartFill } from "react-icons/fa";

function UserPage(props) {
  let userId = props.user.uid;
  const docRef = doc(db, "users", userId);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  async function getUserInfo() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  }
  useEffect(() => {
    getUserInfo();
  }, [data]);
  const runBothFunctions = () => {
    setShowModal(true);
    setEdit(true);
  };
  // getUserInfo();

  return (
    <>
      <div
        id="nav"
        className="bg-Cloket flex justify-start pt-4 pb-2 px-2 lg:p-4 w-full
          lg:w-full 
      "
      >
        <h1
          className="font-syne font-semibold text-white text-2xl sm:px-8 px-4 
        lg:text-5xl"
        >
          CLOKET
        </h1>
        <div className={`sm:flex ${isContentVisible ? "block" : "hidden"}`}>
          <ul
            className="flex font-syne font-semibold sm:items-center sm:gap-8   
          flex-col sm:flex-row text-white"
          >
            <li className="py-2 sm:py-0 text-xs sm:text-lg sm:px-2">HOME</li>
            <li className="py-2 sm:py-0 sm:px-2">BUY</li>
            <li className="py-2 sm:py-0 sm:px-2">INITIATIVE</li>
            <li className="py-2 sm:py-0 sm:px-2">CONTACT</li>
            <li className="py-2 sm:py-0 sm:px-2">SWAP</li>
            {/* <button className="bg-white text-Cloket 
            w-auto sm:w-56 lg:flex mx-6 sm:mx-72">
              LOGIN
            </button> */}
            <button
              className=" w-3/5 h-6 sm:h-10  flex sm:block bg-white  
              rounded-md text-xs lg:text-xl
         lg:w-32  mx-6 sm:mx-44  lg:flex  items-center font-syne 
         justify-center text-Cloket font-semibold"
            >
              CART
            </button>
          </ul>
        </div>

        {/* SHOW MENU : It shows only in small screen(Mobile) */}
        <button
          className="block sm:hidden font-syne rounded-md text-base 
          cursor-pointer p-2 px-10 w-9 h-10  bg-white text-Cloket
           mx-2"
          onClick={toggleContent}
        >
          <IoIosMenu />
        </button>

        {/* MODAL */}
        {showModal ? (
          <>
            <div
              className="justify-center font-syne items-center flex overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div
                  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white 
                outline-none focus:outline-none"
                >
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">EDIT PROFILE</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {edit && (
                      <EditForm data={data} setEdit={setEdit} userId={userId} />
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
        ) : null}

        {/* MODAL */}
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
            {data.address}
          </p>

          <button
            type="submit"
            className="bg-Cloket 
            text-xl text-white w-4/12 
            mx-40  "
            onClick={runBothFunctions}
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
