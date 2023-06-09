import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Status(props) {
    const [statusCode, setStatusCode] = useState('');
    const [products, setProducts] = useState({});
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        setStatusCode(event.target.value);
        // console.log(event.target.value);
        statusUpdate(event.target.value);
    };
    function statusUpdate(code) {
        if (code === 0) {
            setStatus("Under review");
            // setStatusCode("");  //needs to be enabled for fields with same value
        }
        else if (code === 1) {
            setStatus("Approved");
            // setStatusCode("");
        }
        else if (code === 2) {
            setStatus("Ready for Pickup");
            // setStatusCode("");
        }
        else{
            setStatus("");
        }
    }


    let data = []
    useEffect(() => {
        async function getData() {
            const q = query(collection(db, "productStatus"), where("email", "==", props.user.email || ""));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            setProducts(data);
        }
        getData()
    }, [products]);

    // useEffect(() => {
    //     const getData = async () => {
    //         let data = []
    //         const q = query(collection(db, "productStatus"), where("email", "==", props.user.email));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             data.push({ ...doc.data(), id: doc.id })
    //         });
    //         setProducts(data);
    //     }
    //     console.log(products);
    //     getData();
    // }, []);



    // console.log(selectItem);

    return (
        <>
            <div className="flex mt-10 justify-center h-auto">
                <div className="mx-28 sm:w-3/6 w-full bg-Cloket p-0 flex flex-col">
                    <div className="flex justify-between flex-row p-3">
                        <h1
                            className="font-syne ml-0 pt-1 font-semibold text-white 
            sm:text-4xl text-lg"
                        >
                            Status: {status}
                        </h1>

                        {/* Drop Down */}
                        <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                            className="bg-purple-400  font-syne font-semibold border-2 border-Cloket rounded-md
              sm:w-1/4 w-auto
              "
                        >

                            <InputLabel id="demo-select-small-label" className="text-white ">Select Item</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={statusCode}
                                label="items"
                                className="text-Cloket font-syne font-bold "
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* <MenuItem className="text-Cloket" key={products[0].id} value={products[0].brand} >
                                    {products[0].brand}
                                </MenuItem> */}

                                {/* loop not working */}
                                {/* {
                                    products.map((element) => {
                                        // console.log(element);
                                        <MenuItem className="text-Cloket" value={element.brand} >
                                            {element.brand}
                                        </MenuItem>
                                    })
                                } */}

                                {/* {
                                Object.keys(products).map(function (keyName, keyIndex) {
                                    <MenuItem className="text-Cloket" value={products[keyName].brand} >
                                        {products[keyName].brand}
                                    </MenuItem>
                                    // console.log(products[keyName].brand)
                                    // and a[keyName] to get its value
                                })} */}

                                <MenuItem className="text-Cloket" value={products[0]?.statusNumber} >
                                    {products[0]?.brand}
                                </MenuItem>
                                <MenuItem className="text-Cloket" value={products[1]?.statusNumber} >
                                    {products[1]?.brand}
                                </MenuItem>
                                <MenuItem className="text-Cloket" value={products[2]?.statusNumber} >
                                    {products[2]?.brand}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div
                        className="bg-purple-300 bg-opacity-50 mt-2 flex flex-col
           items-center justify-center w-full p-2 "
                    >
                        <h1 className="font-syne font-bold  sm:text-lg text-sm text-white">
                            Verification Sucessfully completed
                        </h1>
                        <p className="font-syne font-light  text-white">11/5/2022</p>
                    </div>
                    <div
                        className="bg-purple-300 bg-opacity-50 mt-2 flex flex-col
           items-center justify-center w-full p-2"
                    >
                        <h1 className="font-syne font-bold  sm:text-lg text-sm text-white">
                            Price evaluation completed
                        </h1>
                        <p className="font-syne font-light text-white">11/5/2022</p>
                    </div>

                    <div className="bg-purple-300 bg-opacity-50 mt-2 flex flex-col mb-28  w-full p-2">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-syne font-bold sm:text-lg text-sm text-white">
                                Ready to List online
                            </h1>
                            <p className="font-syne font-light text-white">11/5/2022</p>
                        </div>
                        <div className="flex flex-row gap-3 sm:gap-0 justify-between">
                            <div className="flex flex-col sm:p-4 p-1 w-96  justify-start items-start">
                                <p className="font-syne font-light sm:text-base text-xs  text-white mb-0">
                                    Offer Price:
                                </p>
                                <h1 className="font-syne font-bold sm:text-lg text-sm -mt-1 text-white">
                                    70 swap coins
                                </h1>
                            </div>
                            <div className="flex flex-row mt-0 sm:gap-10 gap-1 sm:p-4 p-3">
                                <button
                                    className="bg-green-400 text-black font-syne font-semibold
          rounded-md h-10 flex items-center  lg:p-4 p-1 text-sm sm:text-base"
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-600 text-black font-syne font-semibold
          rounded-md h-10 flex items-center  sm:p-3 p-1 text-sm sm:text-base"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Status;
