import { productServices } from "../services/services.product";

export class ProductController {
    getproduct(req: any, res: any) {
        var productID: string = req.body.productID;

        if(productID) {
            productServices.getproduct(req, res);
        }
        else {
            res.status(400).json({
                "status": "400",
                "message": "FAILED"
            });
        }
    }
}

export const productController = new ProductController();