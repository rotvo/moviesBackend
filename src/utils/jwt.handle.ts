import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'token.01010101';

export const generateToken = (id: number): string => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "2h",
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};