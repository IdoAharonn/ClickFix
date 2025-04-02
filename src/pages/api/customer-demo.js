
let x=[
    {id:211394481,
    name:"ido",
    phoneNumber:"052-8743754"},

    {id:211392234,
    name:"izhar",
    phoneNumber:"052-8344432"},
       
    {id:211392288,
     name:"shadi",
    phoneNumber:"054-2155778"},
                

]




export default function handler(req, res) {


    if (req.method === 'GET') {
        return res.status(200).json(
            x
        );
    }

    if (req.method === 'POST') {
        console.log("req.body = ", req.body);
        const y = req.body;
        x.push(y);

        return res.status(200).json(
            x
        );
    }

    if (req.method === 'PUT') {
        const { id, name, phoneNumber } = req.body; // נניח שהמידע מגיע ב-body של הבקשה
    try{
        // עדכון האובייקט באריי
        x = x.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    name: name || item.name,  // עדכון השם אם נמסר, אחרת נשאר כפי שהוא
                    phoneNumber: phoneNumber || item.phoneNumber // עדכון המספר אם נמסר
                };
            }
            return item;
        });
        
        return res.status(200).json(x);}  // מחזירים את האריי המעודכן
  catch(er){console.log(er);
  }
  
    }

    if (req.method === 'DELETE') {
      
            const { id } = req.body;  // נניח שה-ID מגיע בבקשה
        
            // מסנן את האריי ומחזיר רק את האובייקטים שאין להם את ה-ID הזה
            x = x.filter(item => item.id !== id);
        
            return res.status(200).json(x);  // מחזירים את האריי אחרי המחיקה
        
        
    }


}
