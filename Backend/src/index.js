import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import userRoutes from "./routes/user.routes.js"; // 👈 ADD THIS
import collegeRoutes from "./routes/college.routes.js";
import clubRoutes from "./routes/club.routes.js";
import eventRoutes from "./routes/event.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Backend running"));

// 👇 REGISTER ROUTES
app.use("/api/users", userRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);


connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
});
