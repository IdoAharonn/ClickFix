import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Box, Typography, Button, Snackbar, Alert, Grid, styled, Paper, Grid2} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useRouter} from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const BusinessDetails = ({business}) => {
    if (!business) return <div>Business not found</div>;

    const [formData, setFormData] = useState({
        _id: business._id || null,
        name: business.name || '',
        phoneNumber: business.phoneNumber || '',
        address: business.address || '',
        workingHours: {
            from: business.workingHours?.from || '',
            to: business.workingHours?.to || '',
        },
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();


    return (
        <Box sx={{padding: 4, width: '100%'}}>



            <Grid2 container spacing={2}>
                <Grid2 size={8}>

                    <Item>

                        {formData.name}


                    </Item>
                </Grid2>
                <Grid2 size={4}>
                    <Item>size=4</Item>
                </Grid2>
                <Grid2 size={4}>
                    <Item>size=4</Item>
                </Grid2>
                <Grid2 size={8} sx ={{height: 300}}>
                    <Item>{formData.address}</Item>
                </Grid2>
            </Grid2>

        </Box>

    );
};

      {/*      <Typography variant="h4" gutterBottom>*/}
      {/*          עריכת עסק*/}
      {/*      </Typography>*/}

      {/*      <TextField*/}
      {/*          label="שם העסק"*/}
      {/*          name="name"*/}
      {/*          value={formData.name}*/}
      {/*          onChange={handleChange}*/}
      {/*          fullWidth*/}
      {/*          margin="normal"*/}
      {/*      />*/}

      {/*      <TextField*/}
      {/*          label="טלפון"*/}
      {/*          name="phoneNumber"*/}
      {/*          value={formData.phoneNumber}*/}
      {/*          onChange={handleChange}*/}
      {/*          fullWidth*/}
      {/*          margin="normal"*/}
      {/*      />*/}

      {/*      <TextField*/}
      {/*          label="כתובת"*/}
      {/*          name="address"*/}
      {/*          value={formData.address}*/}
      {/*          onChange={handleChange}*/}
      {/*          fullWidth*/}
      {/*          margin="normal"*/}
      {/*      />*/}

      {/*      <TextField*/}
      {/*          label="שעות פתיחה"*/}
      {/*          name="from"*/}
      {/*          value={formData.workingHours.from}*/}
      {/*          onChange={handleChange}*/}
      {/*          fullWidth*/}
      {/*          margin="normal"*/}
      {/*      />*/}

      {/*      <TextField*/}
      {/*          label="שעות סגירה"*/}
      {/*          name="to"*/}
      {/*          value={formData.workingHours.to}*/}
      {/*          onChange={handleChange}*/}
      {/*          fullWidth*/}
      {/*          margin="normal"*/}
      {/*      />*/}

      {/*      /!* <Button*/}
      {/*  variant="contained"*/}
      {/*  color="primary"*/}
      {/*  onClick={handleSave}*/}
      {/*  disabled={loading}*/}
      {/*  sx={{ mt: 2 }}*/}
      {/*>*/}
      {/*  {loading ? 'שומר...' : 'שמירה'}*/}
      {/*</Button> *!/*/}
      {/*      <Box sx={{display: 'flex', mt: 2}}>*/}
      {/*          <Button*/}
      {/*              variant="contained"*/}
      {/*              color="primary"*/}
      {/*              onClick={handleSave}*/}
      {/*              disabled={loading}*/}
      {/*          >*/}
      {/*              {loading ? 'שומר...' : 'שמירה'}*/}
      {/*          </Button>*/}

      {/*          <Button*/}
      {/*              variant="outlined"*/}
      {/*              color="error"*/}
      {/*              startIcon={<DeleteIcon/>}*/}
      {/*              onClick={handleDelete}*/}
      {/*              sx={{ml: 2}}*/}
      {/*          >*/}
      {/*              מחק עסק*/}
      {/*          </Button>*/}
      {/*      </Box>*/}


      {/*      /!* הודעת הצלחה *!/*/}
      {/*      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>*/}
      {/*          <Alert onClose={() => setSuccess(false)} severity="success" sx={{width: '100%'}}>*/}
      {/*              השינויים נשמרו בהצלחה!*/}
      {/*          </Alert>*/}
      {/*      </Snackbar>*/}

      {/*      /!* הודעת שגיאה *!/*/}
      {/*      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>*/}
      {/*          <Alert onClose={() => setError('')} severity="error" sx={{width: '100%'}}>*/}
      {/*              {error}*/}
      {/*          </Alert>*/}
      {/*      </Snackbar>*/}



export async function getServerSideProps(context) {
    const {id} = context.params;

    try {
        //look here
        const res = await axios.get(`http://localhost:3000/api/business/${id}`);
        return {
            props: {
                business: res.data,
            },
        };
    } catch (error) {
        console.error("Error fetching business:", error);
        return {
            props: {
                business: null,
            },
        };
    }
}


export default BusinessDetails;
