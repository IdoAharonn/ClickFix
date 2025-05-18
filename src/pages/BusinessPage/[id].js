// pages/BusinessPage/[id].js
import React from 'react';
import axios from 'axios';

const BusinessDetails = ({ business }) => {
  if (!business) return <div>Business not found</div>;

  return (
    <div>
      <h1>{business.name}</h1>
      <p>Phone: {business.phoneNumber}</p>
      <p>Address: {business.address}</p>
      <p>Working hours: {business.workingHours?.from} - {business.workingHours?.to}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
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
