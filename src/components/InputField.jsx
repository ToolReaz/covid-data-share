import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import PropTypes from "prop-types";

export default function InputField({ title, ...props }) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <TextInput
        placeholderTextColor={COLORS.LightDark}
        selectionColor={COLORS.LightDark}
        style={s.input}
        {...props}
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

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  ...TextInput.PropTypes,
};
