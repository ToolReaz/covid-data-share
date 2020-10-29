import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

export default function InputField({ title }) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <TextInput
        placeholder="Placeholder"
        placeholderTextColor={COLORS.LightDark}
        selectionColor={COLORS.LightDark}
        style={s.input}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: COLORS.Primary,
    marginBottom: 2,
  },
  input: {
    height: 42,
    backgroundColor: COLORS.Light,
    borderBottomColor: COLORS.Primary,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: "RobotoLight",
    paddingLeft: 8,
  },
});
