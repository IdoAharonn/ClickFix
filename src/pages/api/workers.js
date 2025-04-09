import { getAllWorkers,createWorkers,updateWorkers,deleteWorkers } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
   id:211394481'
   name:"ido",
   role: "berbery"
}

 */




//http://localhost:3000/api/queueType

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllWorkers();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = await createWorkers(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateWorkers(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteWorkers(req.body);
    res.status(200).json(data);
  }

}