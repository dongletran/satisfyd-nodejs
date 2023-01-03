import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();
export const database = knex({
    client: 'mssql',
    connection: {
        database: process.env.DB_NAME,
        host: process.env.DB_SERVER,
        server: process.env.DB_SERVER,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        port: 1433,
    }
});