import { InputBarService } from "../services/inputbar.service";
import { Request, Response } from "express";

export class InputBarController {
  constructor(private inputBarService: InputBarService) {}

  inputSearch = async (req: Request, res: Response) => {
    const { data } = req.body;

    console.log("inputText", data);

    if (!data) {
      return res.status(400).json({ message: "no data into controller" });
    }

    let result = await this.inputBarService.inputSearch(data);
    console.log("result to controller", result);

    return res.status(200).json({
      status: true,
      message: "successfully return data to frontend",
      result: result,
    });
  };
}
