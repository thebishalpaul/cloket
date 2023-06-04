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
    return (
        <>
            <div className="header" style={{ display: "flex" }}>
                <div className="status">
                    Status: {item}
                    {/* {console.log(products)} */}
                </div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Select Item</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={item}
                        label="items"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            products.forEach(element => {
                                <MenuItem value={element.brand}>
                                    {element.brand}
                                </MenuItem>
                            })
                        }

                    </Select>
                </FormControl>
            </div>
            <div className="body">
                <div className="first">
                    <p>Verification Successfully</p>
                    <p>date here</p>
                </div>
                <div className="second">
                    <p>price</p>
                    <p>date here</p>
                </div>
                <div className="third">
                    <p>ready to list</p>
                    <p>date here</p>
                    <div className="left">
                        <p>offered price</p>
                        <p>70 swap</p>
                    </div>
                    <div className="right">
                        <button className="accept">Accept</button>
                        <button className="reject">Reject</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Status