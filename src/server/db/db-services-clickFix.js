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

    // let CustomerModel;
    // let customerScheme =  mongoose.Schema({}, { strict: false });
    // try {
    //     CustomerModel = mongoose.model('entity'); // Try to access the model
    // } catch (err) {
    //     // If the model doesn't exist, create it
    //     CustomerModel = mongoose.model('entity', customerScheme);
    // }
    // const data = await CustomerModel.find();
    // // console.log("data from getALlBookmarks = " , data);
    // return data;
}
///////////////////////////////////////////////***CUSTOMER***////////////////////////////////////////////////////////////////////
export const getAllCustomers = async () =>{

    connect2sDB();
    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customer'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customer', {});
    }
    const data = await CustomerModel.find();
    // console.log("data from database customers = " , data);
    return data;
}

export const getCustomer = async (id) =>{
    connect2sDB();
    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customer'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customer', {});
    }
    return await CustomerModel.findById(id);
}



export async function createCustomer(customer) {
    connect2sDB();
    let customerScheme =  mongoose.Schema({}, { strict: false });

    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customer'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customer',customerScheme);
    }
    const newCustomerItem = new CustomerModel(customer);
    const newItem = await newCustomerItem.save();
    return newItem;
}

export const updateCustomer = async (customer) => {
    connect2sDB();
    console.log("customer = ", customer);

    let CustomerModel;
    try {
        CustomerModel = mongoose.model('customer'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        CustomerModel = mongoose.model('customer', {});
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



///////////////////////////////////////////////////***QUEUE***/////////////////////////////////////////////////////////////////////////

export const getAllQueues = async () =>{

    connect2sDB();
    let QueueModel;
    try {
        QueuesModel = mongoose.model('queue'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueModel = mongoose.models.queue || mongoose.model('queue', {});
    }
    const data = await QueueModel.find();
    // console.log("data from database queue = " , data);
    return data;
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



export async function createQueue(queue) {
    connect2sDB();
    let queueScheme =  mongoose.Schema({}, { strict: false });

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


///////////////////////////////////////////////////***businesses***////////////////////////////////////////////////////////


export const getAllBusinesses = async () =>{

    connect2sDB();
    let BusinessModel;
    try {
        BusinessModel = mongoose.model('business'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BusinessModel = mongoose.models.business || mongoose.model('business', {});
    }
    const data = await BusinessModel.find();
    // console.log("data from database business = " , data);
    return data;
}

export const getBusiness = async (id) =>{
    connect2sDB();
    let BusinessModel;
    try {
        BusinessModel = mongoose.model('business'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BusinessModel = mongoose.model('business', {});
    }
    return await BusinessModel.findById(id);
}



export async function createBusiness(business) {
    connect2sDB();
    let businessScheme =  mongoose.Schema({}, { strict: false });

    let BusinessModel;
    try {
        BusinessModel = mongoose.model('business'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BusinessModel = mongoose.model('business',businessScheme);
    }
    const newBusinessItem = new BusinessModel(business);
    const newItem = await newBusinessItem.save();
    return newItem;
}

export const updateBusiness = async (business) => {
    connect2sDB();
    console.log("business = ", business);

    let BusinessModel;
    try {
        BusinessModel = mongoose.model('business'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BusinessModel = mongoose.model('business', {});
    }

   
    try {
        const result = await BusinessModel.findOneAndUpdate(
            { _id: business._id }, // Find by ID
            { $set: business } ,// Use $set to update the fields
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('business not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating business:', error);
        throw error;
    }
}

export const deleteBusiness = async(id) =>{
    connect2sDB();

    console.log("id = ", id)

    let BusinessModel;
    try {
        BusinessModel = mongoose.model('business'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BusinessModel = mongoose.model('business', {});
    }
    const toDelete = await BusinessModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}



////////////////////////////////////////*** WORKER***///////////////////////////////////////////////////////////



export const getAllWorkers = async () =>{

    connect2sDB();
    let WorkerModel;
    try {
        WorkerModel = mongoose.model('worker'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        WorkerModel = mongoose.models.worker || mongoose.model('worker', {});
    }
    const data = await WorkerModel.find();
    // console.log("data from database worker = " , data);
    return data;
}

export const getWorker = async (id) =>{
    connect2sDB();
    let WorkerModel;
    try {
        WorkerModel = mongoose.model('worker'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        WorkerModel = mongoose.model('worker', {});
    }
    return await BusinessModel.findById(id);
}



export async function createWorker(worker) {
    connect2sDB();
    let workerScheme =  mongoose.Schema({}, { strict: false });

    let WorkerModel;
    try {
        WorkerModel = mongoose.model('worker'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        WorkerModel = mongoose.model('worker',workerScheme);
    }
    const newWorkerItem = new WorkerModel(worker);
    const newItem = await newWorkerItem.save();
    return newItem;
}

export const updateWorker = async (worker) => {
    connect2sDB();
    console.log("worker = ", worker);

    let WorkerModel;
    try {
        WorkerModel = mongoose.model('worker'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        WorkerModel = mongoose.model('worker', {});
    }

   
    try {
        const result = await WorkerModel.findOneAndUpdate(
            { _id: worker._id }, // Find by ID
            { $set: worker } ,// Use $set to update the fields
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('worker not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating worker:', error);
        throw error;
    }
}

export const deleteWorker = async(id) =>{
    connect2sDB();

    console.log("id = ", id)

    let WorkerModel;
    try {
        WorkerModel = mongoose.model('worker'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        WorkerModel = mongoose.model('worker', {});
    }
    const toDelete = await WorkerModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}



////////////////////////////////////////*** ADMIN***///////////////////////////////////////////////////////////


export const getAllAdmin = async () =>{

    connect2sDB();
    let AdminModel;
    try {
        AdminModel = mongoose.model('admin'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        AdminModel = mongoose.models.admin || mongoose.model('admin', {});
    }
    const data = await AdminModel.find();
    // console.log("data from database admin = " , data);
    return data;
}

export const getAdmin = async (id) =>{
    connect2sDB();
    let AdminModel;
    try {
        AdminModel = mongoose.model('admin'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        AdminModel = mongoose.model('admin', {});
    }
    return await AdminModel.findById(id);
}



export async function createAdmin(admin) {
    connect2sDB();
    let adminScheme =  mongoose.Schema({}, { strict: false });

    let AdminModel;
    try {
        AdminModel = mongoose.model('admin'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        AdminModel = mongoose.model('admin',adminScheme);
    }
    const newAdminItem = new AdminModel(admin);
    const newItem = await newAdminItem.save();
    return newItem;
}

export const updateAdmin = async (admin) => {
    connect2sDB();
    console.log("admin = ", admin);

    let AdminModel;
    try {
        AdminModel = mongoose.model('admin'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        AdminModel = mongoose.model('admin', {});
    }

   
    try {
        const result = await AdminModel.findOneAndUpdate(
            { _id: admin._id }, // Find by ID
            { $set: admin } ,// Use $set to update the fields
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('admin not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating admin:', error);
        throw error;
    }
}

export const deleteAdmin = async(id) =>{
    connect2sDB();

    console.log("id = ", id)

    let AdminModel;
    try {
        AdminModel = mongoose.model('admin'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        AdminModel = mongoose.model('admin', {});
    }
    const toDelete = await AdminModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}


/////////////////////////////////////////////////***QueueType***/////////////////////////////////////////////////////////////


export const getAllQueueType = async () =>{

    connect2sDB();
    let QueueTypeModel;
    try {
        QueueTypeModel = mongoose.model('queueType'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueTypeModel = mongoose.models.queueType || mongoose.model('queueType', {});
    }
    const data = await QueueTypeModel.find();
    // console.log("data from database queueType = " , data);
    return data;
}

export const getQueueType = async (id) =>{
    connect2sDB();
    let QueueTypeModel;
    try {
        QueueTypeModel = mongoose.model('queueType'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueTypeModel = mongoose.model('queueType', {});
    }
    return await QueueTypeModel.findById(id);
}



export async function createQueueType(queueType) {
    connect2sDB();
    let queueTypeScheme =  mongoose.Schema({}, { strict: false });

    let QueueTypeModel;
    try {
        QueueTypeModel = mongoose.model('queueType'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueTypeModel = mongoose.model('queueType',queueTypeScheme);
    }
    const newQueueTypeItem = new QueueTypeModel(admin);
    const newItem = await newQueueTypeItem.save();
    return newItem;
}

export const updateQueueType = async (queueType) => {
    connect2sDB();
    console.log("queueType = ", queueType);

    let QueueTypeModel;
    try {
        QueueTypeModel = mongoose.model('queueType'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueTypeModel = mongoose.model('queueType', {});
    }

   
    try {
        const result = await QueueTypeModel.findOneAndUpdate(
            { _id: queueType._id }, // Find by ID
            { $set: queueType } ,// Use $set to update the fields
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('admin not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating queueType:', error);
        throw error;
    }
}

export const deleteQueueType = async(id) =>{
    connect2sDB();

    console.log("id = ", id)

    let QueueTypeModel;
    try {
        QueueTypeModel = mongoose.model('queueType'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        QueueTypeModel = mongoose.model('queueType', {});
    }
    const toDelete = await QueueTypeModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}