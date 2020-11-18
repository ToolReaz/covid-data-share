import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { material } from "react-native-typography";
import { useSetRecoilState } from "recoil";
import { isInitState } from "../store/atoms/metaDataState";
import * as SQLite from "expo-sqlite";

export default function SettingScreen() {
  const setIsIntState = useSetRecoilState(isInitState);

  const reset = () => {
    Alert.alert("Attention", "Ceci réinitialisera l'application", [
      {
        text: "Oui",
        onPress: () => {
          SQLite.openDatabase("CODASH").transaction((tx) => {
            tx.executeSql(
              `DROP TABLE Profiles`,
              [],
              async () => {
                await AsyncStorage.setItem("@covid-data-share/isInit", "false");
                setIsIntState(false);
              },
              console.log
            );
          });
        },
      },
    ]);
  };

  return (
    <View style={s.container}>
      <View style={s.category}>
        <Text style={s.categoryText}>Données</Text>
      </View>
      <View style={s.item} onTouchStart={reset}>
        <Text style={s.itemText}>Réinitialiser l'application</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  category: { height: 32, width: "100%" },
  categoryText: {
    ...material.body1,
  },
  item: {},
  itemText: {
    ...material.caption,
  },
});
