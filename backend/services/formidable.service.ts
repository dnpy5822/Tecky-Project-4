import { Knex } from "knex";

export class FormidableService {
  constructor(private knex: Knex) {}

  async awsUploadIcon(userID: any, image: string) {
    try {
      await this.knex("user")
        .update({
          avatar: image,
        })
        .where("user.id", "=", userID);
    } catch (error) {
      console.log("unable to update database");
    }
  }

  async awsUpload(
    activity_name: string,
    type: string,
    tag: string,
    opening_time: string,
    closing_time: string,
    description: string,
    country: string,
    latitude: number,
    longitude: number,
    rating: number,
    image: string
  ) {
    console.log("accessed to service [uploadActivity]");

    let activityID = await this.knex
      .insert({
        name: activity_name,
        opening_time: `${opening_time}00`,
        closing_time: `${closing_time}00`,
        description: description,
        type: type,
        latitude: latitude,
        longitude: longitude,
        rating: rating,
      })
      .into("activity")
      .returning("id");

    await this.knex
      .insert({
        name: country,
        activity_id: activityID[0].id,
      })
      .into("country");

    let tagID = await this.knex
      .select("id")
      .where("name", "=", tag)
      .from("tag");

    await this.knex
      .insert({
        tag_id: tagID[0].id,
        activity_id: activityID[0].id,
      })
      .into("activity_tag");

    await this.knex
      .insert({
        activity_id: activityID[0].id,
        image: image,
      })
      .into("activity_image");
  }
}
