import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("activity", (table) => {
    table.decimal("rating", 14, 2).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("activity", (table) => {
    table.integer("rating").alter();
  });
}
