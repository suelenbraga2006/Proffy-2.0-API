import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar');
        table.string('whatsapp');
        table.string('bio');

        table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        
        table.timestamp('updated_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}