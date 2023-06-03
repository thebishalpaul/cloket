import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Status() {
    const [item, setItem] = React.useState('');

    const handleChange = (event) => {
        setItem(event.target.value);
    };
    return (
        <>
            <div className="header" style={{ display: "flex" }}>
                <div className="status">
                    Status: {item}
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
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
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