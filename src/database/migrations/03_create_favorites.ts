import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('favorites', table => {
        table.string('id').primary();
        
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.integer('teacher_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        
        table.timestamp('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('favorites');
}