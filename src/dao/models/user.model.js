import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor utiliza un email valido'],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts",
    },
    role: {
        type: String,
        enum:["user", "admin"],
        default: "user"
    }


});

const UserModel = new mongoose.model("users", userSchema);

export default UserModel;