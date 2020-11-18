import * as SQLite from "expo-sqlite";

export function iniStorage() {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Profiles (
            lastname TEXT NOT NULL,
            firstname TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
            )`,
        [],
        () => {
          console.log("init tables");
          resolve();
        },
        (a, e) => {
          console.log("cannot init tables");
          console.log(e);
          reject();
        }
      );
    });
  });
}
