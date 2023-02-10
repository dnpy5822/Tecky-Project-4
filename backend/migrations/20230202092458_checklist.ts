import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("checklist", (table) => {
    table.increments("id");
    table.text("content");
    table.boolean("isChecked");
    table.integer("schedule_id").references("schedule.id");
    table.integer("user_id").references("user.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("checklist");
}
