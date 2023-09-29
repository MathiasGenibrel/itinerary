import { Request, Response } from "express";
import { userRepository } from "../config/database";

export const profileController = async (req: Request, res: Response) => {
    const { id } = req.body;
  
    try {
      const user = await userRepository.findOneBy({ id: id });
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while retrieving the profile" });
    }
  };
  
export const profileUpdateController = async (req: Request, res: Response) => {
    const { id } = req.body;
    const { email, username, password } = req.body;

    try {
        const user = await userRepository.findOneBy({id:id});

    if (user) {
        user.email = email;
        user.username = username;
        user.password = password;

        await userRepository.save(user);
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Error while updating the user' });
    }
};

export const profileDeleteController = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        const user = await userRepository.findOneBy({id:id});

        if (user) {
        await userRepository.remove(user);
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting the user' });
    }
};
  