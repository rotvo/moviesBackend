import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import {  insertSupply, updateSupply, deleteSupply, getSupply, getSupplies  } from "../services/supply";


const getSupplyController = async (req: Request, res: Response) => {
    try {
        const response = await getSupply(req.params.id);
        res.status(200).json(response)
    } catch(error){
        handleHttp(res, "ERROR_GET_SUPPLY")
    }
}

const getSuppliesController = async (req: Request, res: Response) => {
    try {
        const response = await getSupplies();
        res.status(200).json(response)
    } catch(error){
        handleHttp(res, "ERROR_GET_SUPPLIES")
    }
}

const postSupplyController = async ({body}: Request, res: Response) => {
    try {
        const response = await insertSupply(body);
        res.status(200).json(response)
    } catch(error){
        handleHttp(res, "ERROR_POST_SUPPLIES")
    }
}

const updateSupplyController = async (req: Request, res: Response) => {
    try {
        const response = await updateSupply(req.params.id, req.body);
        res.status(200).json(response)
    } catch(error){
        handleHttp(res, "ERROR_UPDATE_SUPPLY")
    }
}

const deleteSupplyController = async (req: Request, res: Response) => {
    try {
        const response = await deleteSupply(req.params.id);
        res.status(200).json(response)
    } catch(error){
        handleHttp(res, "ERROR_DELETE_SUPPLY")
    }
}

export { getSupplyController, getSuppliesController, postSupplyController, updateSupplyController, deleteSupplyController };