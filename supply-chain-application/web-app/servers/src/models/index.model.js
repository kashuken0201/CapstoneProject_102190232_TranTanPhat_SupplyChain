import dbConfig from "../configs/db.config.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

export default db;
