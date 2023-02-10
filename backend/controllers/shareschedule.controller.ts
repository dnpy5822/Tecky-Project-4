import { ShareScheduleService } from "../services/shareschedule.service";
import { Request, Response } from "express";

export class ShareScheduleController {
  constructor(private shareScheduleService: ShareScheduleService) {}

  getSchedule = async (req: Request, res: Response) => {
    let data = await this.shareScheduleService.getSchedule();
    // console.log("data to controller", data);
    return res
      .status(200)
      .json({ message: "able to return data", result: data });
  };

  commentRecord = async (req: Request, res: Response) => {
    let scheduleID = req.query.id;
    // console.log("scheduleID", scheduleID);
    let data = await this.shareScheduleService.commentRecord(+scheduleID!);
    // console.log("data to controller", data);
    return res.status(200).json({ status: true, data: data });
  };

  comment = async (req: Request, res: Response) => {
    let { data } = req.body;
    let scheduleID = req.query.id;

    let textInput = data.textInput.trim();
    let userID = data.userInfo;
    // console.log("textInput", textInput);
    // console.log("userID", userID);
    // console.log("scheduleID", scheduleID);

    await this.shareScheduleService.comment(userID, +scheduleID!, textInput);

    return res.status(200).json({ message: "Hello" });
  };

  updateComment = async (req: Request, res: Response) => {
    let { data } = req.body;
    let schedule_comment_id = req.query.id;

    let textInput = data.textInput.trim();

    // console.log("data", textInput);
    // console.log("schedule_comment_id", schedule_comment_id);

    await this.shareScheduleService.updateComment(
      textInput,
      +schedule_comment_id!
    );
    return res.status(200).json({ message: "succeed to update comment" });
  };

  deleteComment = async (req: Request, res: Response) => {
    let schedule_comment_id = req.query.id;

    // console.log("schedule_comment_id", schedule_comment_id);
    await this.shareScheduleService.deleteComment(+schedule_comment_id!);
    return res.status(200).json({ message: "succeed to delete comment" });
  };
}
