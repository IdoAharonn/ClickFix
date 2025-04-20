import { getAllQueue,createQueue,updateQueue,deleteQueue, getAllQueues } from "@/server/db/db-services-clickFix";
/**
 * 
 * תבנית ללקוח  
  {
  
   
  
   queueType:"haircut",
   workerId:7221,
   custumerId:211394481,
   date:14.07
   

}

 */




//http://localhost:3000/api/queue

export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllQueues();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = await createQueue(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = await updateQueue(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteQueue(req.body);
    res.status(200).json(data);
  }

}
// export default function handler(req, res) {


//     if (req.method === 'GET') {

//         console.log("hello ido hagever");
        

//        // const data = await getAllBookmarks();
//         // console.log("data - " , data);

//         res.status(200).json(
//             {
//                 id:211394481,
//                 queueType:"haircut",
//                 workerId:7221,
//                 custumerId:211394481,
//                 date:14.07

//             }
//         );
//     }
// }
