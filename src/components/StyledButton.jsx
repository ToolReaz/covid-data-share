import React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { material } from "react-native-typography";
import { COLORS } from "../styles/colors";

export function StyledButton({ type, text, onPress, style }) {
  const color = type == "primary" ? COLORS.Secondary : COLORS.Dark;
  return (
    <TouchableOpacity
      style={{ backgroundColor: color, ...style }}
      onPress={onPress}
    >
      <Text style={s.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  text: {
    ...material.title,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.White,
    padding: 8,
  },
});
