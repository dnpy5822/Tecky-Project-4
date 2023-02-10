import { Knex } from "knex";
import { knex } from "../client";
import { samples } from "../excel";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("content").del();
  await knex("activity_tag").del();
  await knex("country").del();
  await knex("activity_image").del();
  await knex("activity").del();
  await knex("tag").del();
  await knex("schedule_comment").del();
  await knex("checklist").del();
  await knex("user_schedule").del();
  await knex("schedule").del();
  await knex("user").del();

  let hash_password = await hashPassword("demodemo");
  await seedRow("user", {
    username: "demoacc",
    password_hash: hash_password,
    email: "demo@gmail.com",
    isAdmin: "true",
  });

  let theme_tag_ID = await seedRow("tag", { name: "theme park" });
  let museum_tag_ID = await seedRow("tag", { name: "museum" });
  let garden_tag_ID = await seedRow("tag", { name: "garden" });
  let historic_tag_ID = await seedRow("tag", { name: "historic landmark" });
  let religion_tag_ID = await seedRow("tag", { name: "religion site" });
  let sightseeing_tag_ID = await seedRow("tag", { name: "sight seeing" });
  let food_tag_ID = await seedRow("tag", { name: "food" });

  // Below is to hard-code activity:

  for (let data of samples) {
    console.log("activityID to seedrow", data);
    let activityID = await seedRow("activity", {
      name: data.Name,
      opening_time: data.Opening,
      closing_time: data.Closing,
      description: data.Description,
      type: data.Type,
      rating: data.Rating,
      latitude: data.Lat,
      longitude: data.Long,
    });

    await seedRow("country", { name: data.Country, activity_id: activityID });

    await seedRow("activity_image", {
      activity_id: activityID,
      image: data.S3,
    });

    switch (data.Tag) {
      case "theme park":
        await seedRow("activity_tag", {
          tag_id: theme_tag_ID,
          activity_id: activityID,
        });
        break;
      case "museum":
        await seedRow("activity_tag", {
          tag_id: museum_tag_ID,
          activity_id: activityID,
        });
        break;
      case "garden":
        await seedRow("activity_tag", {
          tag_id: garden_tag_ID,
          activity_id: activityID,
        });
        break;
      case "historic landmark":
        await seedRow("activity_tag", {
          tag_id: historic_tag_ID,
          activity_id: activityID,
        });
        break;
      case "religion site":
        await seedRow("activity_tag", {
          tag_id: religion_tag_ID,
          activity_id: activityID,
        });
        break;
      case "sight seeing":
        await seedRow("activity_tag", {
          tag_id: sightseeing_tag_ID,
          activity_id: activityID,
        });
        break;
      case "food":
        await seedRow("activity_tag", {
          tag_id: food_tag_ID,
          activity_id: activityID,
        });
        break;
    }
  }
}

async function seedRow(table: any, data: any) {
  let rows = await knex(table).select("id").where(data).first();
  if (rows) {
    return rows.id;
  }
  let [{ id }] = await knex.insert(data).into(table).returning("id");
  return id;
}
