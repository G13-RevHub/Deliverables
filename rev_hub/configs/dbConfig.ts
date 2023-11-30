import mongoose from "mongoose"

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_DB_URL!).then(() => {
        console.log("Mongo DB connected")
    }).catch((error) => {
        console.log(error)
    })
}