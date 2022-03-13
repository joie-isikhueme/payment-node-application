// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    development: {
        client: 'mysql',
        connection:{
            host:'localhost',
            port:3306,
            user:'root',
            password:'Liverpool12*',
            database:'nodedb'

        },
        migrations:{
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    
    },
    production: {
        client : 'mysql',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds/production',
        },
    },
}


