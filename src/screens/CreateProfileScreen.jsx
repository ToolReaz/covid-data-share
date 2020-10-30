import AsyncStorage from "@react-native-community/async-storage";
import React, { Component, createRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import InputField from "../components/InputField";
import { StyledButton } from "../components/StyledButton";
import * as Random from "expo-random";

export default class CreateProfileScreen extends Component {
  state = {
    lastname: "",
    firstname: "",
    phone: "",
    address: "",
  };

  create = async () => {
    const { lastname, firstname, phone, address } = this.state;

    if (lastname != "" && firstname != "" && phone != "" && address != "") {
      const raw = await AsyncStorage.getItem("@covid-data-share/profiles");
      const profiles = raw ? JSON.parse(raw) : [];
      const id = (await Random.getRandomBytesAsync(8)).join("").toString("HEX");
      const updatedProfiles = [
        ...profiles,
        { id, lastname, firstname, phone, address },
      ];
      const json = JSON.stringify(updatedProfiles);
      await AsyncStorage.setItem("@covid-data-share/profiles", json);
      this.props.navigation.goBack();
    } else {
      Alert.alert("Error", "All the field are requiered !");
    }
  };

  render() {
    return (
      <View style={s.container}>
        <InputField
          autoCompleteType="name"
          returnKeyType="next"
          onChangeText={(lastname) => this.setState({ lastname })}
          value={this.state.lastname}
          title="Lastname"
        />
        <InputField
          autoCompleteType="name"
          returnKeyType="next"
          onChangeText={(firstname) => this.setState({ firstname })}
          value={this.state.firstname}
          title="Firstname"
        />
        <InputField
          ref={this.input3}
          autoCompleteType="tel"
          returnKeyType="next"
          keyboardType="phone-pad"
          onChangeText={(phone) => this.setState({ phone })}
          value={this.state.phone}
          title="Phone number"
        />
        <InputField
          ref={this.input4}
          autoCompleteType="street-address"
          onChangeText={(address) => this.setState({ address })}
          value={this.state.address}
          title="Address"
        />
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
