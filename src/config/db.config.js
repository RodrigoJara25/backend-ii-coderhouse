import mongoose from "mongoose";

export const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Conneción exitosa a la base de datos");
    } catch (error) {
        console.log("Error de conexión a la base de datos:");
    }
}