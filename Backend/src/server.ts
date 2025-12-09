import express from "express";
import { PrismaClient } from "@prisma/client";
import { ReceiptInputSchema } from "../prisma/generated/schemas";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post("/receipts", async (req, res) => {
  try {
    const parsedData = ReceiptInputSchema.parse(req.body);
    const receipt = await prisma.receipt.create({ data: parsedData });
    res.json(receipt);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.get("/receipts", async (_req, res) => {
  const all = await prisma.receipt.findMany();
  res.json(all);
});

app.listen(3000, () => console.log("Server running on port 3000"));
