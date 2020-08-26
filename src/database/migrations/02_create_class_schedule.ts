import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('classes_schedule', table => {
        table.string('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        
        table.timestamp('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes_schedule');
}