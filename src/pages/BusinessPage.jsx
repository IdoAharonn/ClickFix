import { Box, Grid2 as Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

// TODO - add onchange working hours.
// TODO - do add business
const BusinessPage = (props) => {

    const [businesses, setBusinesses] = useState([]);
    const [newBusiness, setNewBusiness] = useState({
        name:"",
        phoneNumber:"",
        address:"",
        workingHours:{from:0, to:0}
        

    });

    useEffect(() => {
        //מקבלים את המידע מהשרת
        const getData = async () => {
            const tempResponse = await fetch("/api/business");
            let tempData = await tempResponse.json();
            console.log("my data business = ", tempData);
            setBusinesses(tempData);

        }
        getData();


    }, []);


    const changeItem = (ev) => {

        let {value, name} = ev.target;
        setNewBusiness((prevState => {
            return {...prevState, [name]: value};
        }));
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
                    <Box component="div" className="page1" key={item.id}>
                        <Box component="div" className="area" >name: {item.name}</Box>
                        <Box component="div" className="area">Business phone number: {item.phoneNumer}</Box>
                        <Box component="div" className="area">Business address: {item.address}</Box>
                        <Box component="div" className="area">Your working hours</Box>
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
                <TextField id="outlined-basic" label="name:" variant="outlined" name="name" onChange={changeItem}/>
                <TextField id="outlined-basic" label="Business phone number: " variant="outlined"  name="phoneNumber" onChange={changeItem}/>
                <TextField id="outlined-basic" label="Business address:" variant="outlined" name="address"onChange={changeItem} />
                <h2>Working hours</h2>
                <TextField id="outlined-basic" label="from:" variant="outlined" type="number" name="from" />
                <TextField id="outlined-basic" label="to:" variant="outlined" type="number" name="to"/>
                <p>
            state new business = {newBusiness.name}, address = {newBusiness.address}, phone = {newBusiness.phoneNumber}

        </p>
            </Stack>
        </>
    )

}
export default BusinessPage;