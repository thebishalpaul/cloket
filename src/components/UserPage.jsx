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
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <input className="opacity-0 cursor-pointer w-44 h-full" />
            <div>
              <button
                className="text-white   bg-gray-600
                w-10 h-4 flex
                 items-center justify-center
              font-syne py-3 rounded-2xl mt-28 bg-opacity-60 "
              >
                {/* text-white   bg-Cloket 
                hover:bg-opacity-50 hover:bg-Cloket
                 sm:text-base text-xs w-20 h-4 flex
                 items-center justify-center
              font-syne p-2 mt-20 mr-16 */}

                <FiCamera
                  size={18}
                  style={{
                    marginRight: "0",
                    color: "black",
                  }}
                  className="Fa-class"
                />
              </button>
            </div>
          </label>
          {/* Additional Upload Button */}
          <label
            className="absolute inset-0 flex flex-col items-center justify-center 
            mt-12"
          >
            <input
              type="file"
              id="uploadButton"
              onChange={handleImageChange}
              className="opacity-0 cursor-pointer w-44 h-full"
            />
            <div>
              <button
                disabled={loading || !image}
                onClick={handleUpload}
                className="text-white bg-Cloket 
               text-lg w-20 h-4 flex items-center justify-center 
               font-syne p-3 mt-40 mr-16 rounded-lg"
              >
                Upload
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
      <Status data={data} />
    </>
  );
}

export default UserPage;
