import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import  UserModel  from '../models/auth';
import { registerNewUser } from '../services/auth';

const registerCtrl = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const user = await registerNewUser(req.body.email, req.body.password);
        res.status(200).json(user);
    }
    catch(error){
        handleHttp(res, "ERROR_REGISTER", error)
    }
}

const loginCtrl = async (req: Request, res: Response) => {
    
}

export { registerCtrl, loginCtrl };