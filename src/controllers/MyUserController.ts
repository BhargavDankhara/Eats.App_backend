import { Request, Response } from "express";
import User from "../models/user.Schema";

const createCurrentUser = async (req: Request, res: Response) => {
  // check if  user exist
  // creat user if it dosent
  // return user object to clint

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating User" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine = addressLine;
    user.country = country;
    user.city = city;

    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating User" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting User" });
  }
};

export default { createCurrentUser, updateCurrentUser, getCurrentUser };
