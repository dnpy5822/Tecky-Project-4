import { Request, Response } from "express";
import { TripService } from "../services/trip.service";
import { addHours } from "date-fns";

export class TripController {
  constructor(private tripService: TripService) {}

  createTrip = async (req: Request, res: Response) => {
    let values = req.body;
    // console.log(values);

    const userId = req.user?.id; //req.user is from 'guards.ts'

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }

    try {
      const isDup = await this.tripService.checkDuplicate(
        values.nameOfTrip,
        userId
      );

      if (isDup.length >= 1) {
        return res.status(400).json({
          status: false,
          message: "Name already in use, please try another name",
        });
      }

      await this.tripService.createTrip(values, userId);

      return res.status(200).json({
        status: true,
        message: "Create Trip Successfully. let's plan it now!",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: String(error),
      });
    }
  };

  getPlansFromServer = async (req: Request, res: Response) => {
    const userId = req.user?.id; //req.user is from 'guards.ts'

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }
    try {
      const planResult = await this.tripService.getPlansFromServer(userId);
      return res.status(200).json(planResult);
    } catch (error) {
      return res.status(500).json({
        error: String(error),
      });
    }
  };

  getSavedActivityFromServer = async (req: Request, res: Response) => {
    const userId = req.user?.id; //req.user is from 'guards.ts'

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }
    try {
      const savedActivityResult =
        await this.tripService.getSavedActivityFromServer(userId);
      return res.status(200).json(savedActivityResult);
    } catch (error) {
      return res.status(500).json({
        error: String(error),
      });
    }
  };

  getTripListFromServer = async (req: Request, res: Response) => {
    const userId = req.user?.id; //req.user is from 'guards.ts'

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }
    try {
      const tripResult = await this.tripService.getTripListFromServer(userId);
      return res.status(200).json(tripResult);
    } catch (error) {
      return res.status(500).json({
        error: String(error),
      });
    }
  };

  checkIsSaved = async (req: Request, res: Response) => {
    const activityId = req.body;
    const userId = req.user?.id; //req.user is from 'guards.ts'
    // console.log("activityId from controller: ", activityId);

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }

    try {
      const isSaved = await this.tripService.checkIsSaved(
        userId,
        activityId.data
      );

      // console.log("isSaved from controller: ", isSaved);

      return res.status(200).json(isSaved);
    } catch (error) {
      console.log("error: ", error);

      return res.status(500).json({
        error: String(error),
      });
    }
  };

  getActivityDetail = async (req: Request, res: Response) => {
    try {
      const activityDetail = await this.tripService.getActivityDetail();

      return res.status(200).json(activityDetail);
    } catch (error) {
      return res.status(500).json({
        error: String(error),
      });
    }
  };

  insertActivity = async (req: Request, res: Response) => {
    let data = req.body;
    let userId = req.user?.id; //req.user is from 'guards.ts'
    // console.log("insertActivity from controller: ", data);

    let activityId = data.activityId;
    let tripId = data.tripId;
    let eventDate = addHours(new Date(data.eventDate), 8)
      .toISOString()
      .substring(0, 10);

    // console.log("eventDate", eventDate);

    let eventStartTime = new Date(data.eventStartTime)
      .toString()
      .substring(16, 21);
    // .replace(":","")
    let eventEndTime = new Date(data.eventEndTime).toString().substring(16, 21);
    // .replace(":","")

    let dataToInsert = {
      activityId,
      tripId,
      eventDate,
      eventStartTime,
      eventEndTime,
    };
    // console.log("dataToInsert: ", dataToInsert);

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }

    try {
      await this.tripService.insertActivity(dataToInsert);

      return res.status(200).json({
        status: true,
        message: "Saved",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: String(error),
      });
    }
  };

  deleteSavedActivity = async (req: Request, res: Response) => {
    let activityId = req.body.data;

    // console.log("DELETE", activityId);

    let userId = req.user?.id; //req.user is from 'guards.ts'
    // console.log("deleteActivity from controller: ", data);

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }
    try {
      await this.tripService.deleteSavedActivity(activityId, userId);
      return res.status(200).json({
        status: true,
        message: "Successfully unsafe activity",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: String(error),
      });
    }
  };

  getSearchedActivityDetail = async (req: Request, res: Response) => {
    let keyword = req.body.data;
    // console.log("keyword from controller: ", keyword);

    try {
      const searchResult = await this.tripService.getSearchedActivityDetail(
        keyword
      );
      return res.status(200).json(searchResult);
    } catch (error) {
      return res.status(500).json({
        error: String(error),
      });
    }
  };

  deleteTrip = async (req: Request, res: Response) => {
    let tripId = req.body.data;
    // console.log("tripId from controller: ", tripId);

    let userId = req.user?.id; //req.user is from 'guards.ts'

    if (!userId) {
      return res.status(403).json({
        status: false,
        message: "You need to login before using this service",
      });
    }

    try {
      await this.tripService.deleteTrip(tripId);
      return res.status(200).json({
        status: true,
        message: "Successfully delete trip",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: String(error),
      });
    }
  };

  activityDetailPage = async (req: Request, res: Response) => {
    let activityId = req.body.data;

    try {
      const result = await this.tripService.activityDetailPage(activityId);
      return res.status(200).json(result);

    } catch (error) {
      return res.status(500).json({
        error: String(error),
      });
    }
  }
}
