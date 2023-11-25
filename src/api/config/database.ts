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
CREATE TABLE IF NOT EXISTS kwizz
(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL) `).run();


};

export { connectionDB , database };
