import UserModel from "../models/user";
import { encrypt, verify } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async (email: string, password: string) => {
    try {
        const checksIs = await UserModel.findOne({ where: { email } });
        if (checksIs) {
            return "ALREADY_USER";
        }
        
        const password_hash = await encrypt(password);
        const newUser = await UserModel.create({
            email,
            password_hash
        });
        
        // Evitamos devolver el password_hash
        const { password_hash: _, ...userWithoutPassword } = newUser.toJSON();
        return userWithoutPassword;
    } catch (error) {
        console.error('Error REGISTER_USER :', error);
        throw new Error('ERROR REGISTER_USER');
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return "USER_NOT_FOUND";
        }

        const passwordMatch = await verify(password, user.password_hash);
        if (!passwordMatch) {
            return "INCORRECT_PASSWORD";
        }

        const token = generateToken(user.id);
        const { password_hash: _, ...userWithoutPassword } = user.toJSON();
        
        return {
            user: userWithoutPassword,
            token
        };
    } catch (error) {
        console.error('Error Login_user :', error);
        throw new Error('ERROR LOGIN_USER');
    }
};

export { registerNewUser, loginUser };