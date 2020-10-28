import React from "react";
import { Button, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "./../styles/colors";

export default function Button({ type, text }) {
  const color = type == "primary" ? COLORS.Primary : COLORS.Dark;
  return (
    <TouchableOpacity style={{ backgroundColor: color }}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
