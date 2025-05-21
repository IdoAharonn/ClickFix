import { getAllBusinesses,createBusiness,updateBusiness,deleteBusiness } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
  
  id:211394481,
   "businessName":"ido",
   "address":"nahum 7",
   "workers":"ido,shilo",
   "phoneNumber":"0528743754",
   "workingHours":"7",
   "services":[],
   "design": {"color": "purple", "image": 1}
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
    const data = await createBusiness(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateBusiness(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteBusiness(req.body._id);
    res.status(200).json(data);
  }

}