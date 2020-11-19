import { StyleSheet } from "react-native";
import { material, systemWeights } from "react-native-typography";
import { COLORS } from "./colors";

export const mainStyle = StyleSheet.create({
  title: {
    ...material.display1,
    ...systemWeights.light,
    color: COLORS.Black,
    textAlign: "center",
  },

  underline: {
    width: "20%",
    alignSelf: "center",
    borderTopColor: COLORS.Primary,
    borderTopWidth: 2,
  },

  text: {
    ...material.headline,
    color: COLORS.Text,
    textAlign: "center",
    marginTop: 20,
  },

  iconTitle: {
    ...material.headline,
    ...systemWeights.semibold,
    textAlign: "center",
    color: COLORS.Black,
  },

  iconTitleLD: {
    ...material.title,
    ...systemWeights.regular,
    textAlign: "center",
    color: COLORS.Grey,
  },

  listTitle: {
    ...material.title,
    ...systemWeights.light,
    color: COLORS.Text,
    marginTop: 20,
  },
});
