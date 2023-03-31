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

db.prepare( `CREATE TABLE IF NOT EXISTS question
(id INTEGER PRIMARY KEY AUTOINCREMENT, kwizz_id INTEGER NOT NULL, question VARCHAR(255) NOT NULL, FOREIGN KEY(kwizz_id) REFERENCES kwizz(id)) `).run();

db.prepare( `CREATE TABLE IF NOT EXISTS user
(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL) `).run();

db.prepare( `CREATE TABLE IF NOT EXISTS record
(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, kwizz_id INTEGER NOT NULL, score INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES user(id), FOREIGN KEY(kwizz_id) REFERENCES kwizz(id)) `).run();

db.prepare( `CREATE TABLE IF NOT EXISTS answer
(id INTEGER PRIMARY KEY AUTOINCREMENT, question_id INTEGER NOT NULL, is_correct INTEGER NOT NULL, FOREIGN KEY(question_id) REFERENCES question(id)) `).run();

};

export { connectionDB , database };
