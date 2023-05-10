import { dbConfig } from './../config/index.js';
import pgp from 'pg-promise';

const options = {
    pgFormatting: true,
};

const cn = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}?ssl=true`;

const db = pgp(options)(cn);

export default db;
