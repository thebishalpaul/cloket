import React from "react";

import EditForm from "./EditForm";
function Modal(props) {
 

  return (
    <>
      {/* MODAL */}
      {props.showModal ? (
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
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {props.edit && (
                    <EditForm data={props.data} setEdit={props.setEdit} userId={props.userId} getUserInfo={props.getUserInfo}/>
                  )}
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-Cloket text-white active:bg-purple-700 font-syne font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    
    </>
  );
}

export default Modal;
