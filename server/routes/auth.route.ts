import express from "express";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/User.model";
import { DBUser } from "shared/types/shared.types";
import { usernameCheck } from "shared/helpers/validationChecks";
import { setSession } from "../utils/sessions.utils";
import { jsonResponse } from "../utils/middleware.utils";

const authRouter = express.Router();

authRouter.get('/', (req,res)=> {
    res.send("Alive")
})

authRouter.post('/signup', async (req, res) => {
    const body: DBUser = req.body;
    const check = usernameCheck(body.username);
    if(!check.valid){
        return jsonResponse(res, 400, {
            message: check.message
        })
    }
    const existsingUser = await UserModel.findOne({
        username: body.username.toLowerCase()
    });
    if(existsingUser) {
        return jsonResponse(res,409,{
            message: "Username is taken!",
        })
    }
    const hashedPassword = await bcrypt.hash(body.password,10);
    try {
        const newUser = await UserModel.create({
            ...body,
            password: hashedPassword
        });
        setSession(req, newUser);
        console.log(req.session.userDetails)
        console.log("User added successfully");
        // return res.status(200).json(newUser);
        return jsonResponse(res,200,{
            message: "User added successfully",
            result: {
                content: {
                    userId: newUser._id.toString()
                }
            }
        })
    } 
    catch (e) {
        console.error("Error adding user "+e)
        // return res.status(500).json(e);
        return jsonResponse(res,500,{
            message: "Error adding user",
            result: {
                error: e
            }
        })
    }
})

authRouter.post('/login', async (req, res) => {
    const body: DBUser = req.body;
    try{
        const existsingUser = await UserModel.findOne({
            username: body.username
        });
        if(!existsingUser){
            // return res.status(404).json({
            //     messsage: "Cant find username"
            // })
            return jsonResponse(res,404,{
                message: "User not found!",
            })
        }
        if(!(await bcrypt.compare(body.password, existsingUser.password))){
            // return res.status(401).json({
            //     message: "Incorrect password"
            // })
            return jsonResponse(res,401,{
                message: "Incorrect passsword!"
            })
        }
        setSession(req,existsingUser);
        console.log(req.session.userDetails)
        // return res.status(200).json({
        //     message: "Logged in!",
        //     username: existsingUser.username
        // })
        return jsonResponse(res,200,{
            message: "Logged in",
            result: {
                content: {
                    userId: existsingUser._id.toString()
                }
            }
        })
    }
    catch (e) {
        return jsonResponse(res,500,{
            message: "Error logging in",
            result: {
                error: e
            }
        })
    }
})

authRouter.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) 
            // return res.status(500).json({
            //     success: false,
            //     message: 'Could not log out'
            // });
            return jsonResponse(res,500,{
                message: "Error logging out",
                result: {
                    error: err
                }
            })
        res.clearCookie('connect.sid');
        console.log('\nLogged out!')
        console.log(req.session);
        // return res.status(200).json({
        //     success: true,
        //     message: "Logged out!"
        // })
        return jsonResponse(res,200,{
            message: "Logged out successfully",
        })
    })
})

export default authRouter;