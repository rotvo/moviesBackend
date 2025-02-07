import { NextFunction, Request, Response } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers;
    const userAgent = header['user-agent'];
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();
    
    console.log(`[${timestamp}] ${method} ${url} - User Agent: ${userAgent}`);
    
    // También podemos registrar el body en caso de POST/PUT
    if (['POST', 'PUT'].includes(method)) {
        console.log('Body:', JSON.stringify(req.body));
    }

    // Registrar tiempo de respuesta
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

export { logMiddleware };