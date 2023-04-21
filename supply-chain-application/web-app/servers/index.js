import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import routes from "./routes/routes.js";
import test from "./models/test.model.js";

const port = process.env.NODE_SERVER_PORT || 5555;
const hostname = process.env.NODE_SERVER_IP;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use(morgan("combined"));
app.use(cookieParser());

await test.test();

const server = http.createServer(app);
mongoose.set("strictQuery", false);
await mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
