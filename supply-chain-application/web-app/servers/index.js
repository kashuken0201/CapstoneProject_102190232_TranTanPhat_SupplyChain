"use strict"

import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./src/swagger.json" assert { type: "json" }
import { logger } from "./src/utils/logger.js"
import db from "./src/models/index.model.js"
import routes from "./src/routes/index.route.js"
import userService from "./src/services/user.service.js"

const port = process.env.NODE_SERVER_PORT || 5555
const hostname = process.env.NODE_SERVER_IP
const app = express()

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", routes)
app.use(morgan("combined"))
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const server = http.createServer(app)

mongoose.set("strictQuery", false)

await mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("Database connected")
    server.listen(port, hostname, () => {
      logger.info(`Server running at http://${hostname}:${port}/`)
    })
  })
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })

// await userService.importAdmin()