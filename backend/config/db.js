const mongoose=require("mongoose")

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb conected successfully`);
    } catch (error) {
        console.error("mogodb connection failed :",error.message);
        process.exit(1);
    }
}

module.exports=connectDB;