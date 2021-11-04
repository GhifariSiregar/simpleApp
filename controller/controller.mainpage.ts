import { Request, Response } from "express";
import { mainPageServices } from "../services/services.mainpage";

class MainPageController {
  async convertToPdf(req: Request, res: Response) {
    try {
      const result = await mainPageServices.convertToPdf(req.body.data);
      // return res.status(200).json({ status: 'SUCCESS', response: 'SUCCESS' });
      res.writeHead(200, {'Content-Type': 'application/pdf'});
      return res.end(result, 'binary');
    } catch(error: any) {
      console.log(error);
      return res.status(500).json({ status: 'FAILED', response: 'INTERNAL_SERVER_ERROR' })
    }
  }
}

export const mainPageController: MainPageController = new MainPageController();