import express from "express";
import 'dotenv/config';
import cors from "cors";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import receiptsRoutes from "./routes/receipts.routes.js";

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware setup
app.use(cors({
  origin: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: true
}));
app.use(express.json());
// Routes setup
app.use("/receipts", receiptsRoutes);
// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
