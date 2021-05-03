export class ProductServices {
    async getproduct(req: any, res: any): Promise<void> {
        let productID: number = req.body.productID;

        if(productID === 1) {
            res.status(200).json({
                "data": {
                    "id": 1,
                    "name": "Apel"
                },
                "status": "SUCCESS",
                "message": "SUCCESS"
            });
        }
        else if(productID === 2) {
            res.status(200).json({
                "data": {
                    "id": 2,
                    "name": "Pisang"
                },
                "status": "SUCCESS",
                "message": "SUCCESS"
            });
        }
        else {
            res.status(404).json({
                "status": "FAILED",
                "message": "PRODUCT_ID_IS_NOT_FOUND"
            });
        }
    }
}

export const productServices: ProductServices = new ProductServices();