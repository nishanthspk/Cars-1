const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow requests from the specified frontend origin
app.use(cors());
const dbURI = "Your mongodb atlas connection url/database name";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Parse incoming JSON data
app.use(express.json());

require("../backend/models/card")
const User = mongoose.model("CarInfo");
app.post("/post", async(req,res) => {
    const {companyname,modelname,year,amount} = req.body;
    try {
        await User.create({
            companyname,
            modelname,
            year,
            amount,
        });
        res.send({status:"ok"});
    } catch (error) {
        res.send({status:"error"})
    }
});

// Define a route to fetch car information
app.get("/fetchCars", async (req, res) => {
  try {
    const carInfo = await User.find(); // Assuming User is your Mongoose model
    res.json(carInfo); // Send the car information as JSON response
  } catch (error) {
    console.error("Error fetching car info:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors gracefully
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
