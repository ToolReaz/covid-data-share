import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import PropTypes from "prop-types";
import { material, systemWeights } from "react-native-typography";

export default function InputField({ title, ...props }) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <TextInput
        placeholderTextColor={COLORS.Grey}
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
    ...material.subheading,
    ...systemWeights.medium,
    color: COLORS.Text,
    marginBottom: 2,
  },
  input: {
    ...material.subheading,
    ...systemWeights.light,
    height: 42,
    backgroundColor: COLORS.White,
    borderBottomColor: COLORS.Primary + "44",
    borderBottomWidth: 1,
    paddingLeft: 8,
  },
});

InputField.propTypes = {
  title: PropTypes.string.isRequired,
  ...TextInput.propTypes,
};
