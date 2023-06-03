import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "./Modal";
import NavBar from "./NavBar";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import { FiCamera } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';
import Status from "./Status";

function UserPage(props) {
  let userId = props.user.uid;
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function getUserInfo() {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  }

  // upload profile pic
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const [image, setImage] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [imgError, setImgError] = useState("");

  //used to enable disable upload button
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImgError("");
      } else {
        setImage("");
        setImgError("Please select a valid image file type (png or jpg)");
      }
    }
  };

  const handleUpload = () => {
    upload(image, props.user, setLoading);
  };

  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, `DPimages/${image.name}`);

    setLoading(true);

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    props.updateProfile(currentUser, { photoURL });

    setLoading(false);
  }

  useEffect(() => {
    if (props.user && props.user.photoURL) {
      setPhotoURL(props.user.photoURL);
    }
    getUserInfo();
  }, [data, props.user]);
  // ------------------
  const runBothFunctions = () => {
    setShowModal(true);
    setEdit(true);
  };

  return (
    <>
      <NavBar />
      <div
        className="main flex sm:flex-row   w-full justify-center
       items-center sm:gap-0 gap-4 sm:mx-0  
       -mx-4 sm:mt-16"
      >
        <div className=" relative flex flex-col mb-1 sm:w-56">
          {/* Profile Picture */}
          <Avatar
            src={photoURL}
            sx={{
              width: 150,
              height: 150,
              "@media (max-width: 768px)": {
                width: 50,
                height: 50,
              },
            }}
          />

          {/* Upload Button */}
          <label
            htmlFor="uploadButton"
            className="absolute inset-0 flex items-center justify-center"
          >
            <input
              type="file"
              id="uploadButton"
              onChange={handleImageChange}
              className="opacity-0 cursor-pointer w-44 h-full"
            />
            <div className="-mx-26 ">
              <button
                disabled={loading || !image}
                onClick={handleUpload}
                className="text-white block bg-Cloket sm:text-base text-xs 
              font-syne p-1"
              >
                <FiCamera size={18} style={{ marginRight: "0" }} />
              </button>
            </div>
          </label>
        </div>

        {/* --------------- */}

        {/*-----MAIN------*/}

        <div className="user-info flex flex-col mt-5  -mx-2 font-syne font-bold ">
          <p className="font-syne text-sm sm:text-4xl mb-1">{data.name}</p>
          <p className="font-syne  text-xs sm:text-2xl mb-1 text-Cloket">
            +91-{data.phone}
          </p>
          <p className="underline underline-offset-4 mb-2 text-Cloket  text-xs sm:text-2xl">
            {props.user.email}
          </p>
          <p
            className="font-syne text-sm font-light sm:w-60 w-auto  
            sm:text-left p-0 "
          >
            {data.address}
          </p>
        </div>
        <div
          className=" 
        sm:mb-28 sm:-mx-5    mb-20 -mx-14"
        >
          <button
            type="submit"
            className="bg-Cloket
             text-white sm:w-auto w-auto  text-xs p-1 sm:text-xl  
            sm:p-1 rounded-lg mt-10"
            onClick={runBothFunctions}
          >
            <AiFillEdit className="mr-0" />
          </button>
          {edit && (
            <Modal
              data={data}
              edit={edit}
              setEdit={setEdit}
              userId={userId}
              showModal={showModal}
              setShowModal={setShowModal}
              // getUserInfo={getUserInfo}
            />
          )}
        </div>
      </div>
      {/* ----------------- */}

      {/* STATUS SECTION */}

      <div className="flex mt-10  justify-center h-screen">
        <div className="mx-28 w-3/6 bg-purple-500 p-0 flex flex-col">
          <div className="flex justify-between flex-row p-3">
            <h1 className="font-syne ml-0  font-semibold text-white text-2xl">
              STATUS #0000
            </h1>
            <button
              className="bg-white text-Cloket font-syne font-semibold
          rounded-md w-auto h-10 mr-2 px-3 text-xs"
            >
              SELECT ITEM
            </button>
          </div>
          <div
            className="bg-purple-300 mt-2 flex flex-col
           items-center justify-center w-full p-2"
          >
            <h1 className="font-syne font-bold  text-lg text-white">
              Verification Sucessfully completed
            </h1>
            <p className="font-syne font-light text-white">11/5/2022</p>
          </div>
          <div
            className="bg-purple-300 mt-2 flex flex-col
           items-center justify-center w-full p-2"
          >
            <h1 className="font-syne font-bold  text-lg text-white">
              Price evaluation completed
            </h1>
            <p className="font-syne font-light text-white">11/5/2022</p>
          </div>
          {/* FOOTER */}
          <div className="bg-purple-300 mt-2 flex flex-col  w-full p-2">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-syne font-bold text-lg text-white">
                Ready to List online
              </h1>
              <p className="font-syne font-light text-white">11/5/2022</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col p-4 justify-start items-start">
                <p className="font-syne font-light text-base text-white mb-0">
                  Offer Price:
                </p>
                <h1 className="font-syne font-bold text-lg -mt-1 text-white">
                  70 swap coins
                </h1>
              </div>
              <div className="flex flex-row mt-0 gap-3 p-4">
                <button
                  className="bg-green-400 text-black font-syne font-semibold
          rounded-md h-10 flex items-center  p-3 "
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 text-black font-syne font-semibold
          rounded-md h-10 flex items-center  p-3 "
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Status
        data={data}
      />
    </>
  );
}

export default UserPage;
