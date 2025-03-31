import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./src/routes/authRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to Health Check API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
