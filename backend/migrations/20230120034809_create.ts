import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable('activity_image'))) {
        await knex.schema.createTable('activity_image', table => {
          table.increments('id')
          table.integer("activity_id").notNullable().references("activity.id")
          table.string('image',255).notNullable()
          table.timestamps(false, true)
        })
      }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('activity_image')
}

