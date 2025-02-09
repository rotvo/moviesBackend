import { NextFunction, Request, Response } from "express";
import "colors";

// Función para imprimir logs con colores
const logMessage = (level: "INFO" | "SUCCESS" | "WARNING" | "ERROR", message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    let formattedMessage = `[${timestamp}] ${message}`;
  
    switch (level) {
      case "INFO":
        console.log(formattedMessage.blue);
        break;
      case "SUCCESS":
        console.log(formattedMessage.green);
        break;
      case "WARNING":
        console.log(formattedMessage.yellow);
        break;
      case "ERROR":
        console.log(formattedMessage.red.bold);
        break;
    }
  
    if (data) {
      console.log(JSON.stringify(data, null, 2).gray);
    }
  };

// Middleware mejorado
const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.headers['user-agent'] || "Unknown";
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();

    logMessage("INFO", `📌 ${method} ${url} - User Agent: ${userAgent}`);

    if (["POST", "PUT"].includes(method)) {
        logMessage("INFO", `📤 Body:`, req.body);
    }

    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode;

        if (statusCode >= 200 && statusCode < 300) {
            logMessage("SUCCESS", `✅ ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms`);
        } else if (statusCode >= 300 && statusCode < 400) {
            logMessage("WARNING", `⚠️ ${method} ${url} - Redirected - Status: ${statusCode} - Duration: ${duration}ms`);
        } else {
            logMessage("ERROR", `❌ ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms`);
        }
    });

    next();
};

export { logMiddleware };
