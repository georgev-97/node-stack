import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");

const defineDB = async() => {
    await db.none(`
        DROP TABLE IF EXISTS users;
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            TOKEN TEXT
        )
    `);
}
// defineDB();

export { db };
