import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["DEACTIVE", "ACTIVE"],
        default: "ACTIVE",
    },
    roles: {
        type: String,
        required: true,
    },
})

const tokenSchema = new mongoose.Schema({
    refreshToken: {
      type: String,
      required: true,
    },
  })

const User = mongoose.model("user", userSchema)
const Token = mongoose.model("token", tokenSchema)

export default {
    User,
    Token
}