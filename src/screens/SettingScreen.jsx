import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { material, systemWeights } from "react-native-typography";
import { useSetRecoilState } from "recoil";
import { isInitState, userTypeState } from "../store/atoms/metaDataState";
import * as SQLite from "expo-sqlite";
import { useRecoilState } from "recoil";
import { clearProfiles, resetApp } from "../libs/storage";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../styles/colors";

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
      <ScrollView>
        <View style={s.category}>
          <Text style={s.categoryText}>Paramètres généraux</Text>
        </View>

        <SettingItem
          text={
            "Changer en mode " +
            (userType === "client" ? "restaurateur" : "client")
          }
          handler={switchMode}
        />

        <View style={s.category}>
          <Text style={s.categoryText}>Données</Text>
        </View>

        <SettingItem
          handler={deleteProfiles}
          text="Supprimer tout les profiles enregistrés"
        />
        <SettingItem handler={reset} text="Réinitialiser l'application" />
      </ScrollView>
    </View>
  );
}

const SettingItem = ({ handler, text }) => (
  <>
    <TouchableOpacity style={s.item} onPress={handler}>
      <Text style={s.itemText}>{text}</Text>
      <MaterialIcons
        style={s.itemIcon}
        name="navigate-next"
        size={24}
        color="black"
      />
    </TouchableOpacity>
    <Separator />
  </>
);

const Separator = () => (
  <View
    style={{
      width: "90%",
      alignSelf: "center",
      borderBottomColor: COLORS.Grey + "11",
      borderBottomWidth: 1,
    }}
  ></View>
);

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingRight: 16,
    paddingLeft: 16,
  },
  category: {
    height: 32,
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderBottomColor: COLORS.Primary,
    borderBottomWidth: 1,
    marginTop: 16,
  },
  categoryText: {
    ...material.subheading,
    ...systemWeights.semibold,
    paddingLeft: 8,
  },
  item: {
    height: 28,
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    ...material.body1,
    paddingLeft: 10,
  },
  itemIcon: {
    paddingRight: 10,
  },
});
