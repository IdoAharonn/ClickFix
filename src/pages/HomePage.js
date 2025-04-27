import React from "react";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControlLabel, IconButton,
    TextField,
    Typography,Grid2 as Grid
} from "@mui/material";
import { AddBox } from "@mui/icons-material";


 const HomePage = (props)=>{

    return (
        <>
            <h1>Hi I am draft</h1>
            
            <video width="100%" height="60%" autoPlay muted>
              <source src="sirtonDmuy.mp4" type="video/mp4"/>
              {/* <source src="movie.ogg" type="video/ogg"/> */}
               Your browser does not support the video tag.
            </video>


            <Grid container spacing={2} 
            sx = {{
                    height:"30%",
                    alignItems:"center",
                    justifyContent:"center"
                }}
           >
                {/* <Grid size={12}>
                    <h2>size=12</h2>
                </Grid>
                <Grid size={12}>
                    <h2>size=12</h2>
                </Grid> */}
                <Grid size={4}>
                 
                 <Button startIcon={<AddBox/>} variant="contained"> יצירת עסק</Button>



                {/* <IconButton aria-label="Example">
                <FontAwesomeIcon icon={faEllipsisV} />
                </IconButton> */}
                </Grid>
                <Grid size={4}>
                    <h2>size=4</h2>
                </Grid>
                <Grid size={4}>
                <Button startIcon={<AddBox/>} variant="contained"> התחברות </Button>

                </Grid>
            </Grid>
        </>
    )

}
export default HomePage;