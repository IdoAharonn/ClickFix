import { getAllAdmin,createAdmin,updateAdmin,deleteAdmin } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
  
  
}

 */




//http://localhost:3000/api/queueType

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllAdmin();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = await createAdmin(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateAdmin(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteAdmin(req.body);
    res.status(200).json(data);
  }

}