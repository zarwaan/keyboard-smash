import express from "express";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/User.model";
import { DBUser, IUserSessionDetails } from "shared/types/shared.types";
import type { ILoginDetails } from "shared/types/auth.types"
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
        return jsonResponse<ILoginDetails>(res,200,{
            message: "User added successfully",
            result: {
                content: {
                    loggedIn: true,
                    userDetails: req.session.userDetails ?? null
                }
            }
        })
    } 
    catch (e) {
        console.error("Error adding user "+e)
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
            return jsonResponse(res,404,{
                message: "User not found!",
            })
        }
        if(!(await bcrypt.compare(body.password, existsingUser.password))){
            return jsonResponse(res,401,{
                message: "Incorrect passsword!"
            })
        }
        setSession(req,existsingUser);
        console.log(req.session.userDetails)
        return jsonResponse<ILoginDetails>(res,200,{
            message: "Logged in",
            result: {
                content: {
                    loggedIn: true,
                    userDetails: req.session.userDetails ?? null
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
            return jsonResponse(res,500,{
                message: "Error logging out",
                result: {
                    error: err
                }
            })
        res.clearCookie('connect.sid');
        console.log('\nLogged out!')
        console.log(req.session);
        return jsonResponse<ILoginDetails>(res,200,{
            message: "Logged out successfully",
            result: {
                content: {
                    loggedIn: false,
                    userDetails: null
                }
            }
        })
    })
})

authRouter.get('/me', (req, res) => {
    if(!req.session.userDetails)
        return jsonResponse<ILoginDetails>(res, 200, {
            message: "User is not logged in",
            result: {
                content: {
                    loggedIn: false,
                    userDetails: null
                }
            }
        })
    
    return jsonResponse<ILoginDetails>(res, 200, {
        message: "User is logged in",
        result: {
            content: {
                loggedIn : true,
                userDetails: req.session.userDetails
            }
        }
    })
})

export default authRouter;