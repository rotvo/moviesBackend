import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { insertProduct, updateProduct, deleteProduct, getProduct, getProducts } from "../services/product";

const getProductController = async (req: Request, res: Response) => {
    try {
        const response = await getProduct(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCT");
    }
}

const getProductsController = async (req: Request, res: Response) => {
    try {
        const response = await getProducts();
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "ERROR_GET_PRODUCTS");
    }
}

const postProduct = async ({body}: Request, res: Response) => {
    try {
        const responseProduct = await insertProduct(body);
        return res.status(201).json(responseProduct);
    } catch (error) {
        handleHttp(res, "ERROR_POST_PRODUCT");
    }
}

const updateProductController = async (req: Request, res: Response) => {
    try {
        const response = await updateProduct(parseInt(req.params.id), req.body);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "ERROR_UPDATE_PRODUCT");
    }
}

const deleteProductController = async (req: Request, res: Response) => {
    try {
        await deleteProduct(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PRODUCT");
    }
}

export { getProductController, getProductsController, postProduct, updateProductController, deleteProductController };