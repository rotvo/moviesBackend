import { Response } from 'express';

const handleHttp = (res: Response, error: string, errorRaw?: any) => {
    // Log detallado del error en la consola
    if (errorRaw) {
        console.error("Error:", errorRaw.message || errorRaw);
        console.error("Stack Trace:", errorRaw.stack || "No stack trace available");
    }

    res.status(500).send({ error, details: errorRaw?.message || "Internal Server Error" });
};

export { handleHttp };
