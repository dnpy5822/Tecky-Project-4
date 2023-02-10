import { Knex } from "knex";

export class AdminService {
  //@ts-ignore
  constructor(private knex: Knex) {}

  async getUserList() {
    console.log("accessed to service");

    let data = await this.knex
      .select(
        "id",
        "username",
        "email",
        "avatar",
        "isAdmin",
        "warning",
        "isBanned"
      )
      .from("user");

    // console.log("data to service", data);
    return data;
  }

  async sendWarning(userID: number) {
    await this.knex("user").increment("warning").where("id", "=", userID);
  }

  async banUser(userID: number) {
    await this.knex("user").update({ isBanned: true }).where("id", "=", userID);
  }

  async unbanUser(userID: number) {
    await this.knex("user")
      .update({ isBanned: false })
      .where("id", "=", userID);
  }

  async activeUser() {
    let data = await this.knex
      .select("user.id", "username", "avatar")
      .count("user_schedule.user_id as count")
      .from("user_schedule")
      .join("user", "user.id", "=", "user_schedule.user_id")
      .groupBy("user.id");

    return data;
  }
}
