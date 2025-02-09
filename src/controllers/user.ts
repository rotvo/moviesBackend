import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import  UserModel  from '../models/user';
import { registerNewUser, loginUser } from '../services/user';

const registerCtrl = async (req: Request, res: Response) => {
    try {
        const user = await registerNewUser(req.body.email, req.body.password);
        res.status(200).json(user);
    }
    catch(error){
        handleHttp(res, "ERROR_REGISTER", error)
    }
}

const loginCtrl = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.status(200).json(user);
    }
    catch(error){
        handleHttp(res, "ERROR_LOGIN", error)
    }
}

export { registerCtrl, loginCtrl };