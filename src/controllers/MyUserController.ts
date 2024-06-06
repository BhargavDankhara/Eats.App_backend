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

export default { createCurrentUser };