import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTES = `${__dirname}`;
const router = Router();

const cleanFileName = (filename: string) => {
    const file = filename.split('.').shift();
    return file;
}


readdirSync(PATH_ROUTES).filter((file: string) => 
{
    const cleanName = cleanFileName(file);
    if (cleanName !== 'index') {
        import (`./${cleanName}`).then((moduleRouter)=>{
            console.log("se esta cargando la ruta... "+cleanName);
            router.use(`/${cleanName}`, moduleRouter.router);
        });
    }
});



export {router};