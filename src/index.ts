import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connect to database"));
{
  /*connection to data base*/
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/test", async (req: Request, res: Response) => {
//     res.json({ message: 'Hello' });
// })

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// api/my/user
app.use("/api/my/user", myUserRoute);

app.listen(8000, () => {
  console.log("Server is running on localhost:8000");
});
