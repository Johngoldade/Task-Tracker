import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authorization: string | undefined = req.headers.authorization

  if (authorization) {
    const bearerToken: string | undefined = authorization.split(' ').pop()
    const jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY
    jwt.verify(bearerToken as string, jwtSecretKey as string, (error, user) => {
      error ? res.status(403).send(error) : res.sendStatus(200)
      req.user = user as JwtPayload
      return next()
    })
  } else {
    res.sendStatus(401)
  }
};
