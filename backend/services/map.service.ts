import { Knex } from "knex";

export class MapService {
  // @ts-ignore
  constructor(private knex: Knex) {}

  async insertEventDateTime(data: {
    formatDate: string;
    startTime: string;
    endTime: string;
    inputValue: string;
    schedule_id: number;
  }) {
    console.log("date to service", data);

    let activityID = await this.knex
      .select("id")
      .from("activity")
      .where("name", "=", data.inputValue)
      .first();

    console.log("activityID", activityID);

    await this.knex
      .insert({
        day: data.formatDate,
        activity_id: activityID.id,
        schedule_id: data.schedule_id,
        start_time: data.startTime,
        end_time: data.endTime,
      })
      .into("content");
  }

  async getLocation(inputText: string) {
    // console.log(inputText);
    let data = await this.knex
      .select("id", "name", "latitude", "longitude")
      .from("activity")
      .whereILike("name", `%${inputText}%`)
      .limit(5);
    return data;
  }
}
