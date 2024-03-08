import mongoose from "mongoose"
const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database connencted');
    } catch (error) {
        console.log('not connected',error);
    }
    
}

export default ConnectDB;