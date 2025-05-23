import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Grok AI helped me catch an error here where i was returning a header instead of just calling the next function
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Verify the token exists and add the user data to the request object
  const authorization: string | undefined = req.headers.authorization

  if (!authorization) {
    res.sendStatus(401)
    return
  }

  const bearerToken: string | undefined = authorization.split(' ').pop()
  const jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY

  if(!bearerToken || !jwtSecretKey) {
    res.sendStatus(401)
    return
  }

  jwt.verify(bearerToken, jwtSecretKey, (error, user) => {

    if (error) {
      res.status(403).send(error)
      return
    }

    req.user = user as JwtPayload
    next()
    return
    })
};
