const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Allow requests from the specified frontend origin
app.use(cors());
const dbURI = "mongodb+srv://Deepakraja:Barryallen03@cluster0.3atagu3.mongodb.net/Cars";
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

require("../backend/models/car")
const CarDetail = mongoose.model("CarInfo");
app.post("/post", async(req,res) => {
    const {userid,companyname,modelname,year,amount} = req.body;
    try {
        await CarDetail.create({
            userid,
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
    const carInfo = await CarDetail.find(); // Assuming User is your Mongoose model
    res.json(carInfo); // Send the car information as JSON response
  } catch (error) {
    console.error("Error fetching car info:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors gracefully
  }
});


app.get('/userCars/:userid', async (req, res) => {
  const userId = req.params.userid;
  try {
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    if(!mongoose.Types.ObjectId){
      return res.send({error: "Not a object"})
    }
    const userPosts = await CarDetail.find({ userid: userId });
    res.json(userPosts);  
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


const authRoutes = require("./routes/auth");
app.use('/auth', authRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
