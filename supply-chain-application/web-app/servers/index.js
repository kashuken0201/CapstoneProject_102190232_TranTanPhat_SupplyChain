import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/routes";
import network from "./models/network.model";

const port = process.env.NODE_SERVER_PORT || 5000;
const hostname = process.env.NODE_SERVER_IP;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);
app.use(morgan("combined"));

await network.enrollAdmin("manufacturer");
await network.enrollAdmin("consumer");

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
