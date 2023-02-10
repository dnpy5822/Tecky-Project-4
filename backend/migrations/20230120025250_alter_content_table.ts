import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("content", (table) => {
    table.timestamp("day").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("content", (table) => {
    table.string("day", 10).alter();
  });
}
