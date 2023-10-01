import { userRepository } from "../config/database";
import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/auth";
import { schema } from "../schemas/authSchema";

const saltRounds = parseInt(`${process.env.SALTROUNDS}`);

export const registerController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, username, password } = schema.register.parse(req.body);

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    try {
      await userRepository.save(user);
      res.status(201).send();
    } catch (error) {
      res.status(500).json({ message: "Error during user creation." });
    }
  } catch (_) {
    res.status(400).json({ message: "Invalid credential" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = schema.login.parse(req.body);

  try {
    const user = await userRepository.findOneBy({ email: email });
    if (!user) {
      res.status(401).json({ message: "Incorrect credentials." });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user);
        res.json({
          id: user.id,
          email: user.email,
          username: user.username,
          token,
        });
      } else {
        res.status(401).json({ message: "Incorrect credentials." });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error during authentication." });
  }
};
