import { AdminService } from "../services/admin.service";
import { Request, Response } from "express";

export class AdminController {
  constructor(private adminService: AdminService) {}

  getUserList = async (req: Request, res: Response) => {
    // console.log("accessed to controller");
    let data = await this.adminService.getUserList();
    // console.log("data to controller", data);
    return res
      .status(200)
      .json({ message: "successfully get user list", data: data });
  };

  sendWarning = async (req: Request, res: Response) => {
    const { userID } = req.body;
    // console.log("userID", userID);

    await this.adminService.sendWarning(userID);

    return res
      .status(200)
      .json({ message: "sucessfully get userID to controller" });
  };

  banUser = async (req: Request, res: Response) => {
    const { userID } = req.body;
    // console.log("userID", userID);

    await this.adminService.banUser(userID);

    return res.status(200).json({ message: "sucessfully ban user" });
  };

  unbanUser = async (req: Request, res: Response) => {
    const { userID } = req.body;
    // console.log("userID", userID);

    await this.adminService.unbanUser(userID);

    return res.status(200).json({ message: "sucessfully un-ban user" });
  };

  activeUser = async (req: Request, res: Response) => {
    let data = await this.adminService.activeUser();
    return res
      .status(200)
      .json({ message: "successfully get active user info", data: data });
  };

  userInfo = async (req: Request, res: Response) => {
    //@ts-ignore
    const userID = req.query.id;

    // console.log("userID to controller", userID);

    return res.status(200).json({ message: "successfully get user info" });
  };
}
