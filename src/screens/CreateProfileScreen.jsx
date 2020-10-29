import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputField from "../components/InputField";
import { StyledButton } from "../components/StyledButton";

export default class CreateProfileScreen extends Component {
  create = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  render() {
    return (
      <View style={s.container}>
        <InputField title="Lastname" />
        <InputField title="Firstname" />
        <InputField title="Phone number" />
        <InputField title="Address" />
        <StyledButton text="Create" type="primary" onPress={this.create} />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
