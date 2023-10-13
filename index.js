const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/User.model");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

const mongoURI = 'mongodb+srv://gautam:9507254304@cluster0.cfldg6s.mongodb.net/paint?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ' + err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to home");
});

app.get("/gallery", async (req, res) => {
  try {
    const displayPaint = await userModel.find();
    res.send(displayPaint);
  } catch (error) {
    console.log("Error While loading Get Method", error);
    res.status(500).json({ message: "Error while loading gallery" });
  }
});

app.get("/gallery/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userModel.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error while loading product", error);
    res.status(500).json({ message: "Error while loading product" });
  }
});

app.post("/post", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    const newPaint = new userModel(payload);
    await newPaint.save();
    res.send({ Msg: "Post Successfully", newPaint });
  } catch (error) {
    console.error("Error while posting", error);
    res.status(500).json({ message: "Error while posting" });
  }
});

app.delete("/gallery/:notesId", async (req, res) => {
  const notesId = req.params.notesId;
  try {
    const deletedNote = await userModel.findByIdAndRemove(notesId);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
