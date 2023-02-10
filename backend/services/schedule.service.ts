import { Knex } from "knex";

export class ScheduleService {
  constructor(private knex: Knex) {}

  async getSchedule(schedule_id: number) {
    let data = await this.knex
      .select(
        "activity.name as name",
        "start_time",
        "end_time",
        "day",
        "content.id as id"
      )
      .from("content")
      .join("schedule", "schedule.id", "=", "content.schedule_id")
      .join("activity", "activity.id", "=", "content.activity_id")
      .where("schedule_id", schedule_id);

    return data;
  }

  async updateSchedule(
    day: string,
    startTime: string,
    endTime: string,
    contentID: number
  ) {
    console.log("day, startTime, endTime", day, startTime, endTime, contentID);
    try {
      await this.knex("content")
        .update({
          day: day,
          start_time: startTime,
          end_time: endTime,
        })
        .where("id", "=", contentID);

      // console.log("successfully updated schedule");

      return { status: true };
    } catch (error) {
      return console.log(error);
    }
  }

  async deleteSchedule(contentID: number) {
    await this.knex("content").where("id", "=", contentID).del();
  }
}
