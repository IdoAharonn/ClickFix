
export default function handler(req, res) {


    if (req.method === 'GET') {

        console.log("hello ido hagever");
        

       // const data = await getAllBookmarks();
        // console.log("data - " , data);

        res.status(200).json(
            {
                id:211394481,
                name:"ido",
                phone_number:"0528743754"

            }
        );
    }
}
