// // pages/BusinessPage/[id].js
// import React from 'react';
// import axios from 'axios';

// const BusinessDetails = ({ business }) => {
//   if (!business) return <div>Business not found</div>;

//   return (
//     <div>
//       <h1>{business.name}</h1>
//       <p>Phone: {business.phoneNumber}</p>
//       <p>Address: {business.address}</p>
//       <p>Working hours: {business.workingHours?.from} - {business.workingHours?.to}</p>
//     </div>
//   );
// };

// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   try {
//     const res = await axios.get(`http://localhost:3000/api/business/${id}`);
//     return {
//       props: {
//         business: res.data,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching business:", error);
//     return {
//       props: {
//         business: null,
//       },
//     };
//   }
// }

// export default BusinessDetails;
// pages/BusinessPage/[id].js
import React, { useState } from 'react';
import axios from 'axios';
import {TextField, Box, Typography, Button, Snackbar, Alert, TextareaAutosize} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

const BusinessDetails = ({ business }) => {
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
    description: business.description || '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'from' || name === 'to') {
      setFormData((prev) => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await axios.put(`http://localhost:3000/api/business`, formData);
      setSuccess(true);
    } catch (err) {
      console.error('Error updating business:', err);
      setError('שמירת הנתונים נכשלה');
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();

const handleDelete = async () => {
  if (!confirm('האם אתה בטוח שברצונך למחוק את העסק?')) return;

  try {
    await axios.delete(`http://localhost:3000/api/business`,{data: {_id:business._id}});
    alert("העסק נמחק בהצלחה")
    // הפנייה לדף אחר לאחר המחיקה
    //http://localhost:3000/BusinessPage
    router.push('/BusinessPage');
  } catch (err) {
    console.error('שגיאה במחיקת העסק:', err);
    setError('מחיקת העסק נכשלה');
  }
};



  return (
    <Box sx={{ padding: 4, width:500 }}>
      <Typography variant="h4" gutterBottom>
        עריכת עסק
      </Typography>

      <TextField
        label="שם העסק"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="טלפון"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="כתובת"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="שעות פתיחה"
        name="from"
        value={formData.workingHours.from}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="שעות סגירה"
        name="to"
        value={formData.workingHours.to}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
          label="קצת על העסק"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}

      />


      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'שומר...' : 'שמירה'}
      </Button> */}
      <Box sx={{ display: 'flex', mt: 2 }}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleSave}
    disabled={loading}
  >
    {loading ? 'שומר...' : 'שמירה'}
  </Button>

  <Button
    variant="outlined"
    color="error"
    startIcon={<DeleteIcon />}
    onClick={handleDelete}
    sx={{ ml: 2 }}
  >
    מחק עסק
  </Button>
</Box>


      {/* הודעת הצלחה */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          השינויים נשמרו בהצלחה!
        </Alert>
      </Snackbar>

      {/* הודעת שגיאה */}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

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
