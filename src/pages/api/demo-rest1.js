
export default function handler(req, res) {


    if (req.method === 'GET') {

        console.log("hello ido hagever");
        

       // const data = await getAllBookmarks();
        // console.log("data - " , data);

        return res.status(200).json(
            {
                id:211394481,
                name:"ido",
                phoneNumber:"052-8743754"

            });
           
    }
           
            
    if (req.method === 'POST') {

        console.log("hello ido hagever");
        

       // const data = await getAllBookmarks();
        // console.log("data - " , data);
        console.log("req.body = ", req.body);
        const cust = req.body;//
        // 
        //  + "hagever";
        cust.name += " Hagever";

        return res.status(200).json(
            cust
        );
    
    }
    
    
    console.log("if we here the request not good");
    
        res.status(500).json(
            {
                id:211394481,
                name:"ido",
                phoneNumber:"052-8743754"

            });

}
