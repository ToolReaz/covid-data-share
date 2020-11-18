import * as SQLite from "expo-sqlite";

export function iniStorage() {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXIST Profiles (
            lastname TEXT NOT NULL,
            firstname TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        () => {
          reject();
        }
      );
    });
  });
}
