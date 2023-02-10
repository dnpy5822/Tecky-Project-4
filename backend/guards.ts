import { env } from "./env";
import jwtSimple from "jwt-simple";

import { Bearer } from "permit";
import { Request, Response, NextFunction } from "express";
import { User } from "./model";
import { userService } from "./routes/user.routes";

const permit = new Bearer({
  query: "access_token",
});

export async function IsLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = permit.check(req);
    // console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Missing Token" });
    }

    const payload = jwtSimple.decode(token, env.JWT_SECRET);

    // console.log("payload", payload);
    const user: User = await userService.getUserById(payload.id);
    // console.log("user", user);
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ msg: "Invalid User" });
    }
  } catch (error) { }
  return res.status(404).json({ msg: "Invalid JWT error" });
}

export async function IsAdmin(req: Request, res: Response, next: NextFunction) {
  const token = permit.check(req);
  if (!token) {
    return res.status(401).json({ message: "Missing Token" });
  }

  const payload = jwtSimple.decode(token, env.JWT_SECRET);

  if (!payload.isAdmin) {
    return res
      .status(403)
      .json({ message: "You have no permission to access this page" });
  }
  return next();
}
