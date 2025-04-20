import express from "express";
import { nutritionChat } from "./nutrition.js";

const app = express();

app.use(express.json());

app.post("/nutrition", async (req, res, nxt) => {
  const { text } = req.body;

  try {
    const response = await nutritionChat(text);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listenting on port", port);
});
