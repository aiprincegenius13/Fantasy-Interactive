// server.js :contentReference[oaicite:3]{index=3}
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://ejblack369:1234@ejblack369.luk19.mongodb.net/Fantasy-Interactive?retryWrites=true&w=majority&appName=ejblack369', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gameState: { type: Object, default: null }
});
const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, password, gameState: null });
      await user.save();
    } else {
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    }
    res.json({ message: "Login successful", user: { username: user.username, gameState: user.gameState } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/api/save', async (req, res) => {
  try {
    const { username, gameState } = req.body;
    if (!username || !gameState) {
      return res.status(400).json({ error: "Missing data" });
    }
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.gameState = gameState;
    await user.save();
    res.json({ message: "Game saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/load', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Missing username" });
    }
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ gameState: user.gameState });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// New deletion endpoint for user character
app.delete('/api/delete/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await User.findOneAndDelete({ username });
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User character deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
