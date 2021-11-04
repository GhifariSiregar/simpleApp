import { convertHtmlToPdf } from "../middleware/middleware.htmlToPdf";

class MainPageServices {
  async convertToPdf(htmlString: string) {
    const file = await convertHtmlToPdf(htmlString);
    return file
  }
}

export const mainPageServices: MainPageServices = new MainPageServices();