import { getAllBusinesses,createBusinesses,updateBusinesses,deleteBusinesses } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
  
  id:211394481,
   business_name:"ido",
   address:"nahum 7",
   workers:"ido,shilo",
   phone_number:"0528743754",
    and more...
}

 */




//http://localhost:3000/api/queueType

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllBusinesses();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = await createBusinesses(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateBusinesses(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteBusinesses(req.body);
    res.status(200).json(data);
  }

}