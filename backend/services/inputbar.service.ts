import { Knex } from "knex";

export class InputBarService {
  //@ts-ignore
  constructor(private knex: Knex) {}

  async inputSearch(inputText: string) {
    let data = await this.knex
      .select("activity.name")
      .from("activity")
      .join("country", "activity.id", "=", "country.activity_id")
      .whereILike("activity.name", `%${inputText}%`)
      .orWhereILike("country.name", `%${inputText}%`)
      .limit(3);

    console.log("data from service", data);

    return data;
  }
}
