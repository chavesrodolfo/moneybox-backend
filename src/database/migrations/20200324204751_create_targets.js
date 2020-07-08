
exports.up = function(knex) {
    return knex.schema.createTable('targets', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('user_id').notNullable();
        table.timestamps();

        table.foreign('user_id').references('id').inTable('users');
      })
};

exports.down = function(knex) {
    knex.schema.dropTable('targets');
};
