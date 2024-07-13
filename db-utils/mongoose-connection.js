import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = "localhost:27017";
const dbName = process.env.DB_NAME || "local-fsd56we-tamil";

// username & password will be required on connecting to cloud DB
const dbPassword = process.env.DB_PASSWORD || "";
const dbUsr = process.env.DB_USERNAME || "";
const dbCluster = process.env.DB_CLUSTER || "";

// Creating a client instance
const localUrl = `mongodb://${dbUrl}/${dbName}`; // automatically configure the mongo to be connected to a single DB

const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Connecting to the asynchronously
const connectViaMongoose = async () => {
  try {
    await mongoose.connect(cloudUrl);
    console.log("Mongoose Connected Successfully");
  } catch (e) {
    console.log("Error connecting to database", e);
    process.exit(1);
  }
};

export default connectViaMongoose;
