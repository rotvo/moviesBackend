import  UserModel  from "../models/auth";
import {Auth} from "../Interfaces/auth.interface";
import {  Request, Response } from 'express';
import { encrypt } from "../utils/bcrypt.handle";

const registerNewUser = async (email: string, password: string) => {
   const checksIs = await UserModel.findOne({ where: { email } });
   if (checksIs) {
       return "ALREADY_USER";
   }
   const passHash = await encrypt(password);
   return await UserModel.create({ email, password: passHash  });

}   

const loginUser = async ({email, password}: Auth) => {
    
}



export { registerNewUser, loginUser };