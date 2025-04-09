import { getAllQueueType,createQueueType,updateQueueType,deleteQueueType } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
  
  id:211394481,
   name:"ido",
   workerId:7221,
   lenght:30,
   price:100
}

 */




//http://localhost:3000/api/queueType

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllQueueType();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = await createQueueType(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateQueueType(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteQueueType(req.body);
    res.status(200).json(data);
  }

}