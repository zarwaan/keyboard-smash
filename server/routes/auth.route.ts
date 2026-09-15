import express from "express";
import bcrypt from 'bcrypt'
import { UserModel } from "../models/User.model";
import { DBUser } from "shared/types/shared.types";
import { setSession } from "../utils/sessions.utils";

const authRouter = express.Router();

authRouter.get('/', (req,res)=> {
    console.log(typeof req)
    res.send("Alive")
})

authRouter.post('/signup', async (req, res) => {
    const body: DBUser = req.body;
    const hashedPassword = await bcrypt.hash(body.password,10);
    try {
        const newUser = await UserModel.create({
            ...body,
            password: hashedPassword
        });
        setSession(req, newUser);
        console.log(req.session.userDetails)
        console.log("User added successfully");
        return res.status(200).json(newUser);
    } 
    catch (e) {
        console.error("Error adding user "+e)
        return res.status(500).json(e);
    }
})

authRouter.post('/login', async (req, res) => {
    const body: DBUser = req.body;
    try{
        const existsingUser = await UserModel.findOne({
            username: body.username
        });
        if(!existsingUser){
            return res.status(404).json({
                messsage: "Cant find username"
            })
        }
        if(!(await bcrypt.compare(body.password, existsingUser.password))){
            return res.status(401).json({
                message: "Incorrect password"
            })
        }
        setSession(req,existsingUser);
        console.log(req.session.userDetails)
        return res.status(200).json({
            message: "Logged in!",
            username: existsingUser.username
        })
    }
    catch (e) {
        return res.status(500).json(e)
    }
})

authRouter.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({
            success: false,
            message: 'Could not log out'
        });
        res.clearCookie('connect.sid');
        console.log('\nLogged out!')
        console.log(req.session);
        return res.status(200).json({
            success: true,
            message: "Logged out!"
        })
    })
})

export default authRouter;