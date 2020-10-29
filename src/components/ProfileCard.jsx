import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

export default function ProfileCard({ data }) {
  return (
    <View style={s.container}>
      <View style={s.line}>
        <Text style={s.lastname}>{data.lastname?.toUpperCase()} </Text>
        <Text style={s.firstname}> {data.firstname}</Text>
      </View>
      <Text style={s.address}>{data.address}</Text>
      <Text style={s.phone}>{data.phone}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Light,
    padding: 8,
  },
  line: {
    flexDirection: "row",
  },
  lastname: {
    color: COLORS.Primary,
    fontSize: 18,
    fontFamily: "RobotoRegular",
  },
  firstname: {
    color: COLORS.Primary,
    fontSize: 16,
    fontFamily: "RobotoLight",
  },
  address: {
    color: COLORS.LightDark,
    fontSize: 14,
    fontFamily: "RobotoThin",
  },
  phone: {
    color: COLORS.LightDark,
    fontSize: 14,
    fontFamily: "RobotoThin",
  },
});
