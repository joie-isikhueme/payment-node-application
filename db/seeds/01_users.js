/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {userid: 100, name: 'Joy', email: 'joy@gmail.com'},
    {userid: 200, name: 'Kevin', email: 'kevin@gmail.com'},
    {userid: 300, name: 'Liam', email: 'liam@gmail.com'},
  ]);
};
