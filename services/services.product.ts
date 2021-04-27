export class ProductServices {
    async getproduct(req: any, res: any): Promise<void> {
        let productID = req.body.productID;

        if(productID === 1) {
            res.status(200).json({
                "data": {
                    "id": 1,
                    "name": "Apel"
                },
                "status": "200",
                "message": "SUCCESS"
            });
        }
        else if(productID === 2) {
            res.status(200).json({
                "data": {
                    "id": 2,
                    "name": "Pisang"
                },
                "status": "200",
                "message": "SUCCESS"
            });
        }
        else {
            res.status(404).json({
                "status": "404",
                "message": "Product ID not found"
            });
        }
    }
}

export const productServices = new ProductServices();