const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserDetailSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    },
    {
        collection:"UserDetail",
    }

);

mongoose.model("UserDetail", UserDetailSchema);
