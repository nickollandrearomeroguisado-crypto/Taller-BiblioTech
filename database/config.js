import mongoose from "mongoose";

export const dbconnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Bases de datos online");
    } catch(error){
        console.log(error);
        throw new Error("Error conectando a la base de datos");
    }
}