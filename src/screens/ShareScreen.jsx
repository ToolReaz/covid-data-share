import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import ProfileCard from "../components/ProfileCard";
import { StyledButton } from "../components/StyledButton";
import { COLORS } from "../styles/colors";

export default class ShareScreen extends Component {
  render() {
    return (
      <View style={s.container}>
        <StyledButton text="Add one" type="secondary" />
        <Text style={s.listTitle}> My profiles </Text>
        <ProfileCard
          data={{
            lastname: "lastname",
            firstname: "firstname",
            address: "address",
            phone: "phone",
          }}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  listTitle: {
    fontFamily: "RobotoLight",
    fontSize: 18,
    color: COLORS.LightDark,
    marginTop: 20
  },
});
