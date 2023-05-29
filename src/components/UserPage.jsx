import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Modal from "./Modal";
import image from "./icon.png";
import NavBar from "./NavBar";
import { IoIosMenu } from "react-icons/io";
import { BsCartFill } from "react-icons/fa";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Avatar from '@mui/material/Avatar';

function UserPage(props) {
  let userId = props.user.uid;
  const docRef = doc(db, "users", userId);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function getUserInfo() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  // upload profile pic
  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(data.dpUrl);
  // console.log(data.dpUrl);
  const [imgError, setImgError] = useState("");
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
        console.log("invalid image");
      }
    }
  };


  const handleUpload = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `DPimages/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        const ref = doc(db, "users", userId);
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        updateDoc(ref, {
          dpUrl: url
        }).then(() => {
          console.log('dp added');
        })
          .catch((error) => {
            alert(error.message);
            // setImage(null);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
    setImage("");
  };
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
          <Avatar src={url} sx={{ width: 150, height: 150 }} />
          {console.log(url)}
          <input type="file" onChange={handleImageChange} />

          {/* to display image error i.e. if upload other than jpg,png */}
          {imgError && <>
            <div className='error-msg' style={{ color: "red" }}>{imgError}</div>
          </>}
          <button onClick={handleUpload}>Upload</button>
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
            getUserInfo={getUserInfo}
          />}
        </div>
      </div>
    </>
  );
}

export default UserPage;