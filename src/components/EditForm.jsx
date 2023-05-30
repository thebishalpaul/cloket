import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
function EditForm(props) {
    const [name, setName] = useState(props.data.name);
    const [phone, setPhone] = useState(props.data.phone);
    const [address, setAddress] = useState(props.data.address);

    function editDoc(params) {
        const ref = doc(db, "users", props.userId);
        updateDoc(ref, {
            name: params.name,
            phone: params.phone,
            address: params.address,
        })
            .then(() => {
                console.log(
                    "A New Document Field has been added to an existing document"
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <input
                type="text"
                name=""
                id=""
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                name=""
                id=""
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="text"
                name=""
                id=""
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setEdit(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-Cloket text-white active:bg-purple-700 font-syne font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        editDoc({ name: name, phone: phone, address: address });
                        props.setEdit(false);
                    }
                    }
                  >
                    Save Changes
                  </button>
                
                </div>
        </>
    )
}

export default EditForm