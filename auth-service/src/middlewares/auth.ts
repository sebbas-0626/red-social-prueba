import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token mal formateado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // 🚀 Guardamos info útil para los demás microservicios
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error: any) {
    const isExpired = error.name === "TokenExpiredError";

    return res.status(401).json({
      message: isExpired ? "Token expirado" : "Token inválido",
    });
  }
};