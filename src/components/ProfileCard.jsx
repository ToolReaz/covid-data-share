import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { material, systemWeights } from "react-native-typography";
import { COLORS } from "../styles/colors";

export default function ProfileCard({ data, onDelete }) {
  return (
    <View style={s.container}>
      <TouchableOpacity onLongPress={() => onDelete(data.id)}>
        <View style={s.line}>
          <Text style={s.lastname}>{data.lastname?.toUpperCase()} </Text>
          <Text style={s.firstname}> {data.firstname}</Text>
        </View>
        <Text style={s.address}>{data.address}</Text>
        <Text style={s.phone}>{data.phone}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Light,
    padding: 8,
    marginBottom: 10,
  },
  line: {
    flexDirection: "row",
  },
  lastname: {
    ...material.title,
    color: COLORS.Primary,
  },
  firstname: {
    ...material.subheading,
    ...systemWeights.light,
    color: COLORS.Primary,
  },
  address: {
    ...material.body1,
    ...systemWeights.thin,
    color: COLORS.LightDark,
  },
  phone: {
    ...material.body1,
    ...systemWeights.thin,
    color: COLORS.LightDark,
  },
});
