import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("schedule_comment", (table) => {
    table.increments("id");
    table.integer("user_id").references("user.id");
    table.integer("schedule_id").references("schedule.id");
    table.text("content");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("schedule_comment");
}
