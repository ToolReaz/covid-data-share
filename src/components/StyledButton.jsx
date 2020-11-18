import React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { material } from "react-native-typography";
import { COLORS } from "../styles/colors";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

export function StyledButton({ type = "primary", text, onPress, style }) {
  if ((type = "gradient"))
    return (
      <LinearGradient
        style={[s.gradient, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[COLORS.GradientStart, COLORS.GradientEnd]}
      >
        <TouchableOpacity onPress={onPress}>
          <Text style={s.text}>{text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );

  return (
    <TouchableOpacity style={[s[type], style]} onPress={onPress}>
      <Text
        style={[
          s.text,
          type === "transparent" ? { color: COLORS.Primary } : {},
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  text: {
    ...material.title,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.White,
  },

  primary: {
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
    height: 54,
    borderRadius: 27,
    elevation: 3,
    shadowColor: COLORS.Shadow,
    shadowOffset: {
      width: 20,
      height: 50,
    },
  },

  gradient: {
    justifyContent: "center",
    height: 54,
    borderRadius: 27,
    elevation: 3,
  },

  transparent: {
    justifyContent: "center",
    backgroundColor: "#FFFFFFFF",
    borderColor: COLORS.Primary,
    borderWidth: 2,
    height: 54,
    borderRadius: 27,
    elevation: 1,
  },
});

StyledButton.propTypes = {
  type: PropTypes.oneOf(["primary", "gradient", "transparent"]),
  ...Button.propTypes,
};
