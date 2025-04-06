import { getAllCustomers,createCustomer,updateCustomer,deleteCustomer } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
  
  "fullName": "sss",
  "phoneNumber":"052-8743754"
}

 */




//http://localhost:3000/api/customer

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllCustomers();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = await createCustomer(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateCustomer(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteCustomer(req.body);
    res.status(200).json(data);
  }

}