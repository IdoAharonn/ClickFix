import mongoose from "mongoose";//the item that communicate with DB 


const DATABASE_NAME = "ClickFix";
const MONGO_URI = "mongodb://localhost:27017/" + DATABASE_NAME + "?authSource=admin";

let cached = global.mongoose || {conn: null, promise: null};

let isConnected = false;

//Initial connection to DB
export const connect2sDB = async (uri, callback) => {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGO_URI, {serverSelectionTimeoutMS: 5000});
        isConnected = true;
        console.log("db connected by mongoose 222");
    } catch (e) {
        if (e.name === "MongoServerError" && e.code === 18) {
            console.error("Wrong credentials! \n***CHECK THE CREDENTIALS ON THE URI***");
           // alert("wwww");
            throw "Authentication error";
        }
        console.log("Error in mongoose connection 222\n", e);
        throw "error on mongoose";


    }
};


//http://localhost:3000/api/bookmark-db



//getallcustomers


export const getAllEntities = async (entity) =>{

    connect2sDB();

    let CustomerModel;
    let customerScheme =  mongoose.Schema({}, { strict: false });
    try {
        CustomerModel = mongoose.model('entity'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('entity', customerScheme);
    }
    const data = await CustomerModel.find();
    // console.log("data from getALlBookmarks = " , data);
    return data;
}

export const getAllCustomers = async () =>{

    connect2sDB();
    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customers'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customers', {});
    }
    const data = await CustomerModel.find();
    // console.log("data from database customers = " , data);
    return data;
}

export const getCustomer = async (id) =>{
    connect2sDB();
    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customers'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customers', {});
    }
    return await CustomerModel.findById(id);
}



export async function createCustomer(customer) {
    connect2sDB();
    let customerScheme =  mongoose.Schema({}, { strict: false });

    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customers'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueModel = mongoose.model('queues',queueScheme);
    }
    const newQueuesItem = new QueueModel(queue);
    const newItem = await newQueuesItem.save();
    return newItem;
}

export const updateCustomer = async (customer) => {
    connect2sDB();
    console.log("customers = ", customer);

    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customers'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customers', {});
    }

   
    try {
        const result = await CustomerModel.findOneAndUpdate(
            { _id: customer._id }, // Find by ID
            { $set: customer } ,// Use $set to update the fields
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('customer not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
}

export const deleteCustomer = async(id) =>{
    connect2sDB();

    console.log("id = ", id)

    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customers'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customers', {});
    }
    const toDelete = await CustomerModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}







export const getQueue = async (id) =>{
    connect2sDB();
    let QueueModel;
    try {
        QueueModel = mongoose.model('queue'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueModel = mongoose.model('queue', {});
    }
    return await QueueModel.findById(id);
}



export async function createqueue(queue) {
    connect2sDB();
    let customerScheme =  mongoose.Schema({}, { strict: false });

    let QueueModel;
    try {
        QueueModel = mongoose.model('queue'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueModel = mongoose.model('queue',queueScheme);
    }
    const newQueueItem = new QueueModel(queue);
    const newItem = await newQueueItem.save();
    return newItem;
}

export const updateQueue = async (queue) => {
    connect2sDB();
    console.log("queue = ", queue);

    let QueueModel;
    try {
        QueueModel = mongoose.model('queue'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueModel = mongoose.model('queue', {});
    }

   
    try {
        const result = await QueueModel.findOneAndUpdate(
            { _id: queue._id }, // Find by ID
            { $set: queue } ,// Use $set to update the fields
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('queue not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating queue:', error);
        throw error;
    }
}

export const deleteQueue = async(id) =>{
    connect2sDB();

    console.log("id = ", id)

    let QueueModel;
    try {
        QueueModel = mongoose.model('queue'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueModel = mongoose.model('queue', {});
    }
    const toDelete = await QueueModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}