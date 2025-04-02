import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const username = req.body.username
  const password = req.body.password
  console.log(req.body)

  const user = await User.findOne({where: {username: username}})

  if(!user) {
    return res.status(404).send('User not found')
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).send('Authentication failed')
    } else {
      console.log(process.env.JWT_SECRET_KEY)
      const jwtSecretKey = process.env.JWT_SECRET_KEY || ''
      const userToken = jwt.sign({ username }, jwtSecretKey, { expiresIn: 60 })
      console.log(userToken)
      return res.json({ token: userToken })
    }
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
