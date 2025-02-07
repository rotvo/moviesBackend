import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { insertSale, getSale, getSales } from "../services/sale";

const getSaleController = async (req: Request, res: Response) => {
    try {
        const response = await getSale(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "ERROR_GET_SALE");
    }
}

const getSalesController = async (req: Request, res: Response) => {
    try {
        const response = await getSales();
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "ERROR_GET_SALES");
    }
}

const postSale = async ({body}: Request, res: Response) => {
    try {
        const responseSale = await insertSale(body);
        return res.status(201).json(responseSale);
    } catch (error) {
        handleHttp(res, "ERROR_POST_SALE");
    }
}

export { getSaleController, getSalesController, postSale };