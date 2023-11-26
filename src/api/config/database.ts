import SQLiteDatabase, { Database } from "better-sqlite3";
let database: Database;
const connectionDB = (): Promise<void> => {
  return new Promise((resolve) => {
    database = new SQLiteDatabase("data.sqlite");
    loadDatabase(database);
    return resolve();
  });
};
const loadDatabase = (db: Database): void => {

db.prepare( `
CREATE TABLE IF NOT EXISTS user
(user_id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL) `).run();

db.prepare( `
CREATE TABLE IF NOT EXISTS message
(message_id VARCHAR(255) PRIMARY KEY NOT NULL, content TEXT NOT NULL, timestamp INTEGER) `).run();

db.prepare( `
CREATE TABLE IF NOT EXISTS bot
(character_id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL, image TEXT, description TEXT, id_fine_tuning VARCHAR(255)) `).run();


};

export { connectionDB , database };
