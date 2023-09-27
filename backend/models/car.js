const mongoose = require("mongoose");

const CarDetailsSchema = new mongoose.Schema(
    {   
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserDetail", // Reference to the UserDetail model
            required: true,
        },

        companyname: {
            type: String,
            required: true,
        },
        modelname: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
    },
    {
        collection: "CarInfo",
    }
);

mongoose.model("CarInfo", CarDetailsSchema);