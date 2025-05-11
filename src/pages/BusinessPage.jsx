import { Box, Grid2 as Grid } from "@mui/material";
import React, { useEffect, useState } from "react";


const BusinessPage = (props) => {

    const [businesses, setBusinesses] = useState([]);

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
                    <Box component="div" className="page1" key = {item.id}>
                        <Box component="div" className="area">name: {item.name}</Box>
                        <Box component="div" className="area">Business phone number: {item.phoneNumer}</Box>
                        <Box component="div" className="area">Business address: {item.address}</Box>
                        <Box component="div" className="area">Your working hours</Box>
                        <Box component="div" className="area">Adding services:</Box>
                    </Box>
                );
            })}



        </>
    )

}
export default BusinessPage;