import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("activity", (table) => {
    table.string("opening_time", 20).alter();
    table.string("closing_time", 20).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("activity", (table) => {
    table.timestamp("opening_time").alter();
    table.integer("closing_time").alter();
  });
}
