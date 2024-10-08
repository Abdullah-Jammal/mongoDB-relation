import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Missing mongoDB URL");
  }
  if (isConnected) {
    console.log("MongoDB is already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ta3leem-form",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log(error, "WHY WHY");
  }
};
