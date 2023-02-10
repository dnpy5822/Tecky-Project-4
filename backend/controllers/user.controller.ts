import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../hash";
import { UserService } from "../services/user.service";
import jwtSimple from "jwt-simple";
import { env } from "../env";

export class UserController {
  constructor(private userService: UserService) {}

  signup = async (req: Request, res: Response) => {
    let { username, password, email } = req.body;

    if (!username) {
      return res.status(400).json({
        status: false,
        message: "Username is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Password is required",
      });
    }
    if (username.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Username must be at least 6 characters",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 8 characters",
      });
    }

    let user = await this.userService.checkUsernameDup(username);
    if (user.length >= 1) {
      return res.status(400).json({
        status: false,
        type: "username",
        message: "The username has been registered",
      });
    }

    let checkEmail = await this.userService.checkEmailDup(email);
    if (checkEmail.length >= 1) {
      return res.status(400).json({
        status: false,
        type: "email",
        message: "The email has been registered",
      });
    }

    let hashedPassword = await hashPassword(password);
    await this.userService.createAccount(username, hashedPassword, email);

    return res.status(200).json({
      status: true,
      message:
        "Successfully registered. Please login and enjoy our services. Have a nice day!",
    });
  };

  login = async (req: Request, res: Response) => {
    try {
      let { username, password } = req.body;

      // console.log(req.body);

      let user = await this.userService.findUser(username);
      if (!user) {
        res.status(400);
        return res.json({
          status: false,
          message: "Username is incorrect",
        });
      }

      let isPasswordMatched = await checkPassword(password, user.password_hash);
      if (!isPasswordMatched) {
        res.status(400);
        return res.json({
          status: false,
          message: "Incorrect password",
        });
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
      };

      const token = jwtSimple.encode(payload, env.JWT_SECRET);

      return res.status(200).json({
        status: true,
        message: "Successfully logged in",
        token: token,
        isBanned: user.isBanned,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status: false,
        error: error,
      });
    }
  };

  loginwithFacebook = async (req: Request, res: Response) => {
    try {
      let { result } = req.body;

      if (result.accessToken) {
        let token = await this.userService.checkwithFacebook(
          result.accessToken
        );
        // console.log("token to controller12312312312", token);
        if (token === false) {
          return res
            .status(403)
            .json({ message: "This account has been banned", status: false });
        }
        return res.status(200).json({ token: token });
      } else {
        return res.status(400).json({
          status: false,
          message: "Unable to retrieve to Facebook AccessToken",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Invalid error in Facebook controller" });
    }
  };

  loginwithGoogle = async (req: Request, res: Response) => {
    try {
      let { result } = req.body;

      if (result.access_token) {
        let token = await this.userService.checkwithGoogle(result.access_token);
        // console.log("token to controller 12039123091230", token);
        if (token === false) {
          return res
            .status(403)
            .json({ message: "This account has been banned", status: false });
        }
        // console.log("received token on google controller", token);
        return res.status(200).json({ token: token });
      } else {
        return res.status(400).json({
          status: false,
          message: "Unable to retrieve to Google AccessToken",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Invalid error in Google controller" });
    }
  };
}
