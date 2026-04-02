import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'] as string;

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: number;
        username: string;
      };
      if (!decoded.userId) {
        throw new UnauthorizedException('Token invalide : userId manquant');
      }
      req['userId'] = decoded.userId;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
