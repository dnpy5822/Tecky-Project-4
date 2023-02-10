import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("activity", (table) => {
    table.dropColumn("tag_id");
    table.dropColumn("comment_id");
  });

  await knex.schema.table("comment", (table) => {
    table.integer("activity_id").references("activity.id").notNullable();
  });
  await knex.schema.createTable("activity_tag", (table) => {
    table.increments("id");
    table.integer("tag_id").references("tag.id").notNullable();
    table.integer("activity_id").references("activity.id").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("activity", (table) => {
    table.integer("tag_id").references("tag.id");
    table.integer("comment_id").references("comment.id");
  });

  await knex.schema.table("comment", (table) => {
    table.dropColumn("activity_id");
  });

  await knex.schema.dropTable("activity_tag");
}
