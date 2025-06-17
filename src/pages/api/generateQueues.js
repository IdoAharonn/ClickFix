

import {
    getBusiness,
    updateBusiness,
    // אם תרצה, תייבא גם את הפונקציות הבאות:
    // getAllQueue, createQueue, updateQueue, deleteQueue, getAllQueues
} from "@/server/db/db-services-clickFix";

// פונקציות עזר
function getMonthName(monthIndex) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthIndex];
}

function timeStringToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function minutesToTimeString(minutes) {
    const hrs = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mins = String(minutes % 60).padStart(2, '0');
    return `${hrs}:${mins}`;
}

function generateTimeSlotsForDay(date, start, end) {
    const startMin = timeStringToMinutes(start);
    const endMin = timeStringToMinutes(end);
    const slots = [];

    for (let time = startMin; time + 30 <= endMin; time += 30) {
        slots.push({
            date: date.toISOString().split('T')[0], // yyyy-mm-dd
            time: minutesToTimeString(time),
            available: true,
            customer: null
        });
    }

    return slots;
}

function generateTimeSlotsForDay2(dateStr, start, end) {

    //adding hours for local date
    start += 2;
    end += 2;

    // const startMin = timeStringToMinutes(start);
    const date = new Date(dateStr);
    console.log("data!!", date, start, end)
    // const endMin = timeStringToMinutes(end);
    const slots = [];



    // for (let time = startMin; time + 30 <= endMin; time += 30) {
    while (start < end) {
        let dateFrom = new Date(date);

        dateFrom.setHours(start);
        let dateTo = new Date(dateFrom);
        dateTo.setMinutes(30);
        slots.push({
            from: dateFrom,
            to: dateTo,
            available: true,
            customer: null
        });

        dateFrom = new Date(dateTo)
        start++;
        dateTo = new Date(date);
        dateTo.setHours(start);
        slots.push({
            from: dateFrom,
            to: dateTo,
            available: true,
            customer: null
        });
    }
    console.log("slots = ", slots);
    

    return slots;
}

// function generateQueues(business, month) {
//     const year = new Date().getFullYear();
//     const monthString = getMonthName(month);

//     // ודא שbusiness.queues מוגדר ואובייקט
//     if (!business.queues || typeof business.queues !== 'object') {
//         business.queues = {};
//     }

//     // אתחול מערך החודשים
//     business.queues[monthString] = [];

//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     // ודא שbusiness.openingHours מוגדר ואובייקט
//     const openingHours = (business.openingHours && typeof business.openingHours === 'object') ?
//         business.openingHours : {};

//     for (let day = 1; day <= daysInMonth; day++) {
//         const date = new Date(year, month, day);
//         const dayOfWeek = date.getDay(); // 0 = ראשון, 6 = שבת

//         // כלל: רק ראשון עד חמישי (0 עד 4)
//         if (dayOfWeek === 5 || dayOfWeek === 6) {
//             continue; // מדלגים על שישי ושבת
//         }

//         const hours = openingHours[dayOfWeek];

//         //   if (hours && hours.start && hours.end) {
//         // const slots = generateTimeSlotsForDay(date, hours.start, hours.end);
//         const slots = generateTimeSlotsForDay2(date, openingHours.from, openingHours.to);

//         business.queues[monthString].push(...slots);
//         //   }
//     }

//     return business.queues[monthString];
// }


function generateQueues2(businessCopy, month) {
    const business = businessCopy.toObject();
    const year = new Date().getFullYear();
    const monthString = getMonthName(month);

    // ודא שbusiness.queues מוגדר ואובייקט
    if (!business.queues || typeof business.queues !== 'object') {
        business.queues = {};
    }

    // אתחול מערך החודשים
    business.queues[monthString] = [];


    //מס הימים בחודש
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // ודא שbusiness.openingHours מוגדר ואובייקט
    const openingHours = (business.openingHours && typeof business.openingHours === 'object') ?
        business.openingHours : {};

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0 = ראשון, 6 = שבת

        // כלל: רק ראשון עד חמישי (0 עד 4)
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            continue; // מדלגים על שישי ושבת
        }

        const hours = openingHours[dayOfWeek];

        //   if (hours && hours.start && hours.end) {
        // const slots = generateTimeSlotsForDay(date, hours.start, hours.end);
        const slots = generateTimeSlotsForDay2(date, business.workingHours.from, business.workingHours.to);

        business.queues[monthString].push(...slots);
        
    }
    business["x"]=10;
    // business.set("y", 20);
    console.log("business!! ", business);
    
       updateBusiness(business);

    return business.queues;
}


// ה־API handler
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                _id,
                month
            } = req.body;
            console.log("Request body:", req.body);

            const business = await getBusiness(_id);
            console.log("Business fetched:", business);

            if (!business) {
                return res.status(404).json({
                    error: "Business not found"
                });
            }

            const generatedQueues = generateQueues2(business, month);

            console.log("Generated queues count:", generatedQueues.length);

            // אם תרצה לשמור למסד הנתונים, תוכל לעשות כאן:
            // await updateQueue({ _id, queues: business.queues });
            updateBusiness(business);
            res.status(200).json({
                success: true,
                queues: generatedQueues
            });
        } catch (error) {
            console.error("Error in handler:", error);
            res.status(500).json({
                success: false,
                error: error.message || "Internal Server Error"
            });
        }
    } else {
        res.status(405).json({
            error: "Method Not Allowed"
        });
    }
}