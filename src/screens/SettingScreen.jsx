import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { material, systemWeights } from "react-native-typography";
import { useSetRecoilState } from "recoil";
import { isInitState, userTypeState } from "../store/atoms/metaDataState";
import * as SQLite from "expo-sqlite";
import { useRecoilState } from "recoil";
import { clearProfiles, resetApp } from "../libs/storage";

export default function SettingScreen() {
  const setIsIntState = useSetRecoilState(isInitState);
  const [userType, setUserType] = useRecoilState(userTypeState);

  const reset = () => {
    Alert.alert(
      "Attention",
      "Ceci réinitialisera l'application",
      [
        { style: "cancel", onPress: () => {}, text: "Cancel" },
        {
          onPress: async () => {
            await clearProfiles();
            await resetApp();
            setIsIntState(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteProfiles = () => {
    Alert.alert(
      "Attention",
      "Ceci supprimera tout vos profiles crées et enregistrés !",
      [
        { style: "cancel", onPress: () => {}, text: "Cancel" },
        {
          onPress: async () => {
            await clearProfiles();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const switchMode = async () => {
    const newMode = userType === "client" ? "worker" : "client";
    await AsyncStorage.setItem("@covid-data-share/userType", newMode);
    setUserType(newMode);
  };

  return (
    <View style={s.container}>
      <View style={s.category}>
        <Text style={s.categoryText}>Paramètres généraux</Text>
      </View>
      <View style={s.item} onTouchStart={switchMode}>
        <Text style={s.itemText}>
          Changer en mode {userType === "client" ? "restaurateur" : "client"}
        </Text>
      </View>
      <View style={s.category}>
        <Text style={s.categoryText}>Données</Text>
      </View>
      <View style={s.item} onTouchStart={deleteProfiles}>
        <Text style={s.itemText}>Supprimer tout les profiles enregistrés</Text>
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
  category: {
    height: 32,
    width: "100%",
    backgroundColor: "#DEDEDE",
    height: 50,
    justifyContent: "center",
  },
  categoryText: {
    ...material.subheading,
    ...systemWeights.semibold,
    paddingLeft: 8,
  },
  item: {
    height: 28,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: 2,
    height: 50,
    justifyContent: "center",
  },
  itemText: {
    ...material.body1,
    paddingLeft: 10,
  },
});
