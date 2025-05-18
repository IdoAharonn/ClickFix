import { Box, Button, Grid2 as Grid, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';


// TODO - add onchange working hours.
// TODO - do add business
const BusinessPage = (props) => {

    const [businesses, setBusinesses] = useState([]);
    const [newBusiness, setNewBusiness] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        workingHours: { from: 0, to: 0 }


    });
    const getData = async () => {
        const tempResponse = await fetch("/api/business");
        let tempData = await tempResponse.json();
        console.log("my data business = ", tempData);
        setBusinesses(tempData);

    }
    useEffect(() => {
        //מקבלים את המידע מהשרת

        getData();


    }, []);


    // const changeItem = (ev) => {

    //     let { value, name } = ev.target;
    //     setNewBusiness((prevState => {
    //         return { ...prevState, [name]: value };
    //     }));
    // }
    const changeItem = (ev) => {
        let { value, name } = ev.target;

        // בודקים אם מדובר בשדות של workingHours
        if (name === "from" || name === "to") {
            setNewBusiness((prevState) => ({
                ...prevState,
                workingHours: {
                    ...prevState.workingHours,
                    [name]: Number(value),
                },
            }));
        } else {
            setNewBusiness((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };


    const saveBusiness = async () => {
        const newItem = await axios.post("/api/business", newBusiness);
        if (newItem) {
            setNewBusiness({
                name: "",
                phoneNumber: "",
                address: "",
                workingHours: { from: 0, to: 0 }

            });
            getData();


        }


    }

    return (
        <>


            <Box component="div" className="page1" >
                <Box component="div" className="area">name: shuki barbar style</Box>
                <Box component="div" className="area">Business phone number</Box>
                <Box component="div" className="area">Business address</Box>
                <Box component="div" className="area">Your working hours</Box>
                <Box component="div" className="area">Adding services:

                    <Grid container spacing={2}
                        sx={{
                            height: "30%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Grid size={4}>

                            Hair wash
                        </Grid>
                        <Grid size={4}>

                            20 minutes
                        </Grid>
                        <Grid size={4}>

                            30 NIS
                        </Grid>
                        <Grid size={4}>

                            Hair wash
                        </Grid>
                        <Grid size={4}>

                            20 minutes
                        </Grid>
                        <Grid size={4}>

                            30 NIS
                        </Grid>
                    </Grid>
                </Box>
                <Box component="div" className="area">Workers</Box>
                <Box component="div" className="area">Let's design your business page</Box>
            </Box>

            <h1>Here the real area: </h1>

            {/* כאן רואים את האייטמים */}
            {businesses.map(item => {
                return (
                    <Box component="div" className="page1" key={item.id} sx={{
                        border: "purple 2px solid", margin: 3,
                        width: 300, padding: 5
                    }}>
                        <Link href={`/BusinessPage/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box component="div" className="area" >name: {item.name}</Box>
                        </Link>
                        <Box component="div" className="area">Business phone number: {item.phoneNumber}</Box>
                        <Box component="div" className="area">Business address: {item.address}</Box>
                        {/* <Box component="div" className="area">Your working hours</Box> */}
                        <Box component="div" className="area">
                            Working hours: {item.workingHours?.from} - {item.workingHours?.to}
                        </Box>

                        <Box component="div" className="area">Adding services:</Box>
                    </Box>
                );
            })}
            <Stack direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                }} >
                <TextField id="outlined-basic" label="name:" variant="outlined" name="name" onChange={changeItem} value={newBusiness.name} />
                <TextField id="outlined-basic" label="Business phone number: " variant="outlined" name="phoneNumber" onChange={changeItem} value={newBusiness.phoneNumber} />
                <TextField id="outlined-basic" label="Business address:" variant="outlined" name="address" onChange={changeItem} value={newBusiness.address} />
                <h2>Working hours</h2>
                {/* <TextField id="outlined-basic" label="from:" variant="outlined" type="number" name="from" value={newBusiness.from}/>
                <TextField id="outlined-basic" label="to:" variant="outlined" type="number" name="to" value={newBusiness.to}/> */}
                <TextField id="outlined-basic" label="from:" variant="outlined" type="number" name="from" value={newBusiness.workingHours.from} onChange={changeItem} />
                <TextField id="outlined-basic" label="to:" variant="outlined" type="number" name="to" value={newBusiness.workingHours.to} onChange={changeItem} />

                {/* <p>
                    state new business = {newBusiness.name}, address = {newBusiness.address}, phone = {newBusiness.phoneNumber}

                </p> */}
                <p>
                    state new business = {newBusiness.name}, address = {newBusiness.address}, phone = {newBusiness.phoneNumber},
                    working hours from: {newBusiness.workingHours.from} to: {newBusiness.workingHours.to}
                </p>

                <Button onClick={saveBusiness} variant="contained">Add Business</Button>
            </Stack>
        </>
    )

}
export default BusinessPage;