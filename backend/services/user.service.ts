import { Knex } from "knex";
import fetch from "node-fetch";
import jwtSimple from "jwt-simple";
import { User } from "../model";
import { env } from "../env";

export class UserService {
  constructor(private knex: Knex) {}

  async createAccount(username: string, password: string, email: string) {
    try {
      await this.knex
        .insert({
          username: username,
          password_hash: password,
          email: email,
          isAdmin: false,
        })
        .into("user");
    } catch (error) {
      console.log(error);
    }
  }

  async checkUsernameDup(username: string) {
    return await this.knex
      .select("username")
      .from("user")
      .where("username", username);
  }

  async checkEmailDup(email: string) {
    return await this.knex.select("email").from("user").where("email", email);
  }

  async findUser(username: string) {
    return await this.knex
      .select(
        "id",
        "username",
        "password_hash",
        "email",
        "avatar",
        "isAdmin",
        "isBanned"
      )
      .from("user")
      .where({ username })
      .first();
  }

  async getUserById(id: string) {
    return await this.knex
      .select("id", "username")
      .from("user")
      .where({ id: id })
      .first();
  }

  async getUser(username: string, email: string) {
    return await this.knex
      .select("id", "username", "email", "avatar", "isBanned")
      .from("user")
      .where({ username, email })
      .first();
  }

  async createJWTToken(data: User, jwtSecret: string) {
    const payload = {
      id: data.id,
      username: data.username,
      email: data.email,
      isAdmin: data.isAdmin,
      avatar: data.avatar,
    };

    let token = jwtSimple.encode(payload, jwtSecret);

    return token;
  }

  async checkwithFacebook(accessToken: string) {
    let params = new URLSearchParams();
    params.set("fields", "name,email,picture");
    params.set("access_token", accessToken);
    let res = await fetch("https://graph.facebook.com/me?" + params);
    let data = await res.json();

    // console.log("data", data);

    if (data) {
      let user = await this.getUser(data.name, data.email);

      if (!user) {
        let user = await this.knex
          .insert({
            username: data.name,
            email: data.email,
            avatar: data.picture.data.url,
            isAdmin: false,
          })
          .into("user")
          .returning(["id", "username", "email", "avatar", "isAdmin"]);

        let token = this.createJWTToken(user[0], env.JWT_SECRET);

        return token;
      }
      if (user.isBanned) {
        return false;
      }
      let token = this.createJWTToken(user, env.JWT_SECRET);

      return token;
    }
    return { message: "error on facebook service" };
  }
  async checkwithGoogle(accessToken: string) {
    let data = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let json = await data.json();

    if (json) {
      let user = await this.getUser(json.name, json.email);
      // console.log("user1231313", user);

      if (!user) {
        // console.log("REGISTER");
        // console.log(json);

        const insertUser = await this.knex
          .insert({
            username: json.name,
            email: json.email,
            avatar: json.picture,
            isAdmin: false,
          })
          .into("user")
          .returning(["id", "username", "email", "avatar", "isAdmin"]);

        let users: User = {
          username: json.name,
          email: json.email,
          avatar: json.picture,
          isAdmin: false,
          isBanned: false,
          id: insertUser[0].id,
        };

        let token = this.createJWTToken(users, env.JWT_SECRET);
        return token;
      }
      if (user.isBanned) {
        return false;
      }

      let token = this.createJWTToken(user, env.JWT_SECRET);
      return token;
    }
    return { message: "error on google service" };
  }
}
