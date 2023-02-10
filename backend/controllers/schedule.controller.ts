import { ScheduleService } from "../services/schedule.service";
import { Request, Response } from "express";
import { addHours } from "date-fns";

export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  getSchedule = async (req: Request, res: Response) => {
    const { schedule_id } = req.body;

    if (!schedule_id) {
      return res.status(400).json({ message: "no data to controller" });
    }
    let data = await this.scheduleService.getSchedule(schedule_id);

    return res.status(200).json({
      result: data,
    });
  };

  updateWhenDrop = async (req: Request, res: Response) => {
    const { data } = req.body;

    console.log("data to controller", data);
    let day = addHours(new Date(data.start), 8).toISOString().substring(0, 10);
    let startTime = addHours(new Date(data.start), 8)
      .toISOString()
      .substring(11, 16);
    let endTime = addHours(new Date(data.end), 8)
      .toISOString()
      .substring(11, 16);
    let contentID = data.event.resource;
    // console.log("day", day);
    // console.log("startTime", startTime);
    // console.log("endTime", endTime);

    if (!data) {
      return res
        .status(400)
        .json({ message: "no output received from controller" });
    }
    this.scheduleService.updateSchedule(day, startTime, endTime, contentID);

    return res
      .status(200)
      .json({ message: "successfully fetched to controller" });
  };

  deleteWhenDoubleClick = async (req: Request, res: Response) => {
    const { data } = req.body;
    let contentID = data.resource;

    await this.scheduleService.deleteSchedule(contentID);
    return res.status(200).json({ message: "succeed to fetch" });
  };
}
