import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "./Modal";
import NavBar from "./NavBar";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
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
        setImgError('');
      }
      else {
        setImage("");
        setImgError('Please select a valid image file type (png or jpg)')
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
    alert("Uploaded file!");
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
      <div className="main flex justify-center items-center gap-14 mt-16">
        {/* profile picture */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Avatar src={photoURL} sx={{ width: 150, height: 150 }} />
          <input type="file" onChange={handleImageChange} />

          {/* to display image error i.e. if upload other than jpg,png */}
          {imgError && <>
            <div className='error-msg' style={{ color: "red" }}>{imgError}</div>
          </>}

          <button disabled={loading || !image} onClick={handleUpload} style={{ color: "blue" }}>Upload</button>
        </div>
        {/* --------------- */}

        <div className="user-info flex flex-col font-syne font-bold  ">
          <p className="font-syne text-4xl mb-1">{data.name}</p>
          <p className="font-syne text-2xl mb-1 text-Cloket">
            +91-{data.phone}
          </p>
          <p className="underline underline-offset-4 mb-2 text-Cloket text-2xl">
            {props.user.email}
          </p>
          <p className="font-syne text-sm font-light w-60 ">{data.address}</p>

          <button
            type="submit"
            className="bg-Cloket 
            text-xl text-white w-4/12 
            mx-40"
            onClick={runBothFunctions}
          >
            EDIT
          </button>
          {edit && <Modal
            data={data}
            edit={edit}
            setEdit={setEdit}
            userId={userId}
            showModal={showModal}
            setShowModal={setShowModal}
          // getUserInfo={getUserInfo}
          />}
        </div>
      </div>
      <Status
        data={data}
      />
    </>
  );
}

export default UserPage;