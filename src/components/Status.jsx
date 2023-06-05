import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Status(props) {
    const [item, setItem] = React.useState('');
    const [products, setProducts] = React.useState([]);

    const handleChange = (event) => {
        setItem(event.target.value);
    };

    async function getData() {
        let data = []
        const q = query(collection(db, "productStatus"), where("email", "==", props.user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        });
        setProducts(data);
    }
    useEffect(() => {
        getData();
    }, []);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const productsRef = db.collection('productStatus').where("email", "==", props.user.email);
    //             const snapshot = await productsRef.get();

    //             const productsData = snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 ...doc.data(),
    //             }));

    //             setProducts(productsData);
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         }
    //     };

    //     fetchProducts();
    // }, []);


    return (
        <>
            <div className="flex mt-10   justify-center h-auto">
                <div className="mx-28 sm:w-3/6 w-full bg-Cloket p-0 flex flex-col">
                    <div className="flex justify-between flex-row p-3">
                        <h1
                            className="font-syne ml-0 pt-1 font-semibold text-white 
            sm:text-4xl text-lg"
                        >
                            Status: {item}
                        </h1>
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
                                value={item}
                                label="items"
                                className="text-Cloket font-syne font-bold "
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    products.map((element) => {
                                        // console.log(element.id);
                                        <MenuItem className="text-Cloket" key={element.id} value={element.brand} >
                                            {element.brand}
                                        </MenuItem>
                                    })
                                }
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
