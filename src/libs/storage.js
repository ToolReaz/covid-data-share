import AsyncStorage from "@react-native-community/async-storage";
import * as SQLite from "expo-sqlite";

export function iniStorage() {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Profiles (
            lastname TEXT NOT NULL,
            firstname TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            share INTEGER DEFAULT 0
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

export function clearProfiles() {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS Profiles`,
        [],
        () => {
          resolve();
        },
        (a, e) => {
          console.error(e);
          reject();
        }
      );
    });
  });
}

export async function resetApp() {
  await AsyncStorage.setItem("@covid-data-share/isInit", "false");
  await AsyncStorage.removeItem("@covid-data-share/userType");
  return;
}
