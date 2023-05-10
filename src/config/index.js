import 'dotenv/config';

export const serverConfig = {
    port: process.env.PORT,
};

export const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
};
