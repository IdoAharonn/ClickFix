import { getAllEntities } from "@/server/db/db-services-clickFix";
//http://localhost:3000/api/entity
//localhost 
export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = getAllEntities(req.body.entity);
        console.log("data = ", data);
        
       res.status(200).json(data);
    }
  
    // if (req.method === 'POST') {
    //   const data = createBookmarks(req.body);
  
    //   res.status(200).json(data);
    // }
  
    if (req.method === 'PUT') {
  
      const data = updateBookmark(req.body);
  
      res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
  
      const data = deleteBookmark(req.body);
      res.status(200).json(data);
    }
}