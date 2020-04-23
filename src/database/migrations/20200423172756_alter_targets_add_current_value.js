
exports.up = function(knex) {
    return knex.schema.alterTable('targets', function (table) {
        table.decimal('currentValue');
      })
};

exports.down = function(knex) {
    return knex.schema.table('targets', function (table) {
        table.dropColumn('currentValue');
      })
};
