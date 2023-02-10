import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user", (table) => {
    table.integer("warning").defaultTo(0);
    table.boolean("isBanned").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user", (table) => {
    table.dropColumn("warning");
    table.dropColumn("isBanned");
  });
}
