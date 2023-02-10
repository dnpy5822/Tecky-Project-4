import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('username',60).nullable()
      table.string('password_hash',60).nullable()
      table.string('email', 255).notNullable()
      table.string('avatar', 2048).nullable()
      table.boolean('isAdmin').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('tag'))) {
    await knex.schema.createTable('tag', table => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('comment'))) {
    await knex.schema.createTable('comment', table => {
      table.increments('id')
      table.string('title', 50).notNullable()
      table.text('context').notNullable()
      table.integer('rating').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('activity'))) {
    await knex.schema.createTable('activity', table => {
      table.increments('id')
      table.string('name', 100).notNullable()
      table.timestamp('opening_time').nullable()
      table.timestamp('closing_time').nullable()
      table.text('description').nullable()
      table.string('type', 20).notNullable()
      table.integer('rating').nullable()
      table.integer('likes').nullable()
      table.string('latitude', 20).notNullable()
      table.string('longitude',20).notNullable()
      table.integer('tag_id').unsigned().nullable().references('tag.id')
      table.integer('comment_id').unsigned().nullable().references('comment.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('country'))) {
    await knex.schema.createTable('country', table => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.integer('activity_id').unsigned().notNullable().references('activity.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('schedule'))) {
    await knex.schema.createTable('schedule', table => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.string('type', 20).nullable()
      table.string('privacy', 20).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('content'))) {
    await knex.schema.createTable('content', table => {
      table.increments('id')
      table.integer('schedule_id').unsigned().notNullable().references('schedule.id')
      table.string('day', 10).notNullable()
      table.string('action', 100).nullable()
      table.integer('activity_id').unsigned().nullable().references('activity.id')
      table.timestamp('start_time').nullable()
      table.timestamp('end_time').nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('user_schedule'))) {
    await knex.schema.createTable('user_schedule', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.integer('schedule_id').unsigned().notNullable().references('schedule.id')
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_schedule')
  await knex.schema.dropTableIfExists('content')
  await knex.schema.dropTableIfExists('schedule')
  await knex.schema.dropTableIfExists('country')
  await knex.schema.dropTableIfExists('activity')
  await knex.schema.dropTableIfExists('comment')
  await knex.schema.dropTableIfExists('tag')
  await knex.schema.dropTableIfExists('user')
}
