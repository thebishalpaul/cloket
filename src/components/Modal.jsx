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
            overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg  
                relative flex flex-col sm:w-full bg-white w-64
                outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b 
                border-solid border-slate-200 
                rounded-t">
                  <h3 className="text-lg sm:text-3xl font-semibold">EDIT PROFILE</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {props.edit && (
                    <EditForm data={props.data} setEdit={props.setEdit} 
                    userId={props.userId} />
                  )}
                </div>
                {/*footer*/}
               
              </div>
            </div>
          </div>
          
        </>
      ) : null}
    
    </>
  );
}

export default Modal;
