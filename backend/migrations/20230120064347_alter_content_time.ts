import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("content", (table) => {
    table.string("start_time", 20).alter();
    table.string("end_time", 20).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("content", (table) => {
    table.timestamp("start_time").alter();
    table.timestamp("end_time").alter();
  });
}
