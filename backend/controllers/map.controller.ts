import { MapService } from "../services/map.service";
import { Request, Response } from "express";
//@ts-ignore
import { addHours, getYear, getMonth, getDate } from "date-fns";

type TimeDate = {
  formatDate: string;
  startTime: string;
  endTime: string;
  inputValue: string;
  schedule_id: number;
};

export class MapController {
  //@ts-ignore
  constructor(private mapService: MapService) {}

  insertEventDateTime = async (req: Request, res: Response) => {
    const { eventDate, eventStartTime, eventEndTime, inputValue, schedule_id } =
      req.body;
    console.log("controller req.body", req.body);

    // let date = new Date(eventDate);
    // let formatDate = `${getYear(date)}/${getMonth(date) + 1}/${getDate(date)}`;
    // let startTime = addHours(new Date(eventStartTime), 8);
    // let endTime = addHours(new Date(eventEndTime), 8);
    let formatDate = addHours(new Date(eventDate), 8)
      .toISOString()
      .substring(0, 10);
    console.log("eventDate", formatDate);

    let startTime = addHours(new Date(eventStartTime), 0)
      .toString()
      .substring(16, 21);
    console.log("eventStartTime", startTime);
    let endTime = addHours(new Date(eventEndTime), 0)
      .toString()
      .substring(16, 21);
    console.log("eventEndTime", endTime);
    console.log("inputValue", inputValue);
    console.log("schedule_id", schedule_id);

    let data: TimeDate = {
      formatDate,
      startTime,
      endTime,
      inputValue,
      schedule_id,
    };

    await this.mapService.insertEventDateTime(data);
    return res.status(200).json({ result: "data" });
  };

  getLocation = async (req: Request, res: Response) => {
    let input = req.query.keyword + "";
    // console.log("input", input);
    let data = await this.mapService.getLocation(input);
    // console.log("data to controller", data);
    return res
      .status(200)
      .json({ message: "successfully to get location", result: data });
  };
}
