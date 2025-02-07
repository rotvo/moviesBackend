import { insertItem, getItem, getItems } from "../services/item";
import { handleHttp } from "../utils/error.handle";
import {  Request, Response } from 'express';


const getItemController = async (req: Request, res: Response) => {
    try{
        const response = await getItem(req.params.id);
        res.status(200).json(response);
    }
    catch(error){
        handleHttp(res, "ERROR_GET_ITEM");
    }
}

const getItemsController = async (req: Request, res: Response) => {
    try{
        const response = await getItems();
        res.status(200).json(response);
    }
    catch(error){
        handleHttp(res, "ERROR_GET_ITEMS");
    }
}

const updateItem = (req: Request, res: Response) => {
    try{

    }
    catch(error){
        handleHttp(res, "ERROR_UPDATE_ITEM");
    }
}

const postItem = async ({body}: Request, res: Response) => {
    try{
      const responseItem = await insertItem(body);
      return res.status(201).json(responseItem);
    }
    catch(error){
        handleHttp(res, "ERROR_POST_ITEM");
    }
}

const deleteItem = (req: Request, res: Response) => {
    try{

    }
    catch(error){
        handleHttp(res, "ERROR_DELETE_ITEM");
    }
}







export { getItemController, getItemsController, updateItem, postItem, deleteItem};