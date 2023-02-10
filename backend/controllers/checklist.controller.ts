import { CheckListService } from "../services/checklist.service";
import { Request, Response } from "express";

export class CheckListController {
  //@ts-ignore
  constructor(private checkListService: CheckListService) {}

  getCheckList = async (req: Request, res: Response) => {
    let schedule_id = req.query.id;

    let data = await this.checkListService.getCheckList(+schedule_id!);
    return res.status(200).json({ message: "fetched checklist", data: data });
  };

  deleteChecklist = async (req: Request, res: Response) => {
    let { checklist_id } = req.body;

    console.log("checklistID to controller", checklist_id);
    await this.checkListService.deleteCheckList(checklist_id);

    return res.status(200).json({ message: "successfully delete checklist" });
  };

  addChecklist = async (req: Request, res: Response) => {
    let { data } = req.body;

    console.log("input to controller", data);
    await this.checkListService.addChecklist(
      data.userID,
      data.inputValue,
      +data.scheduleID
    );
    return res.status(200).json({ message: "successfully added to checklist" });
  };

  updateCheck = async (req: Request, res: Response) => {
    let { data } = req.body;

    await this.checkListService.updateChecklist(data.status, data.checklistID);

    return res
      .status(200)
      .json({ message: "successfully fetched checkbox status" });
  };
}
