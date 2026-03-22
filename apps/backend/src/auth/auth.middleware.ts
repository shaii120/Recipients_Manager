import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
}
