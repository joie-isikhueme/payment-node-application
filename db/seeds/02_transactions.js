/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  await knex('transactions').insert([
    {id: 100, balance: '30000'},
    {id: 200, balance: '40000'},
    {id: 300, balance: '45000'}
  ]);
};
