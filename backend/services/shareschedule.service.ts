import { Knex } from "knex";

export class ShareScheduleService {
  //@ts-ignore
  constructor(private knex: Knex) {}

  async getSchedule() {
    let data = await this.knex
      .select(
        "schedule.id as scheduleID",
        "schedule.name as scheduleName",
        "schedule.created_at as createdAt",
        "user.username",
        "user.avatar",
        "tag.name as tag"
      )
      .from("schedule")
      .join("user_schedule", "user_schedule.schedule_id", "=", "schedule.id")
      .join("user", "user.id", "=", "user_schedule.user_id")
      .join("content", "content.schedule_id", "=", "schedule.id")
      .join("activity", "activity.id", "=", "content.activity_id")
      .join("activity_tag", "activity_tag.activity_id", "=", "activity.id")
      .join("tag", "tag.id", "=", "activity_tag.tag_id")
      .where("schedule.privacy", "=", "public")
      .groupBy("schedule.id", "user.username", "user.avatar", "tag.name");

    return data;
  }

  async commentRecord(scheduleID: number) {
    console.log("scheduleID from service", scheduleID);
    let data = await this.knex
      .select(
        "content",
        "schedule_comment.created_at as createdAt",
        "user.username as username",
        "user.avatar",
        "schedule_comment.id"
      )
      .from("schedule_comment")
      .join("user", "user.id", "=", "schedule_comment.user_id")
      .where("schedule_comment.schedule_id", "=", scheduleID)
      .orderBy("schedule_comment.created_at", "desc");

    console.log("data to service", data);
    return data;
  }

  async comment(userID: number, scheduleID: number, textInput: string) {
    await this.knex
      .insert({
        user_id: userID,
        schedule_id: scheduleID,
        content: textInput,
      })
      .into("schedule_comment");
  }

  async updateComment(textInput: string, schedule_comment_id: number) {
    await this.knex("schedule_comment")
      .update({
        content: textInput,
      })
      .where("id", "=", schedule_comment_id);
  }

  async deleteComment(schedule_comment_id: number) {
    await this.knex("schedule_comment")
      .where("id", "=", schedule_comment_id)
      .del();
  }
}
