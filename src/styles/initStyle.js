import { StyleSheet } from "react-native";
import { material, systemWeights } from "react-native-typography";
import { COLORS } from "./colors";

export const initStyle = StyleSheet.create({
  title: {
    ...material.display1,
    ...systemWeights.light,
    color: COLORS.Dark,
    textAlign: "center",
  },

  underline: {
    width: "20%",
    alignSelf: "center",
    borderTopColor: COLORS.Primary,
    borderTopWidth: 2,
  },

  text: {
    ...material.body1,
    ...systemWeights.light,
    color: COLORS.Dark,
    textAlign: "center",
    marginTop: 40,
  },

  iconText: {
    ...material.headline,
    ...systemWeights.bold,
    color: COLORS.Dark,
    textAlign: "center",
  },
});
