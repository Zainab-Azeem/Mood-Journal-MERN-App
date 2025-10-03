import express from "express"
import { Mood } from "./models/db.js"
import mongoose from "mongoose"
import cors from "cors"


await mongoose.connect('mongodb://127.0.0.1:27017/db');

const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { mood, text } = req.body;
  const entry = new Mood({MOOD:mood , NOTE:text});
  await entry.save();
  res.json(entry);
  //console.log("worked")
});

app.get('/', async(req, res) => {
 try {
    const moods = await Mood.find().sort({ date: -1 }); // latest first
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
