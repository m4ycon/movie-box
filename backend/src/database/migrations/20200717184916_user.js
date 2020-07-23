export async function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.specificType('movies_watched', 'INT[]');
    table.specificType('watch_later', 'INT[]');
  });
}

export async function down(knex) {
  return knex.schema.dropTable('users');
}