import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import validateLoginToken from '../utils/validateLoginToken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}
const JWT_SECRET = process.env.JWT_SECRET || 'ColoqueSeuTokenNoEnviroment';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(401)
      .json({ error: 'Você precisa estar logado para continuar!' });
    return;
  }
  const token = authHeader.split(' ')[1];

  const tokenExists = await validateLoginToken.tokenValidation(token);
  if (!tokenExists) {
    res.status(401).json({
      error: 'Sessão inválida. Faça login novamente.',
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    validateLoginToken.deleteInvalidToken(token);
    res.status(401).json({
      error: 'Tempo de sessão expirado! Por favor faça login novamente.',
    });
  }
};
