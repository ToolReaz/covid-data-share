import React, { Component } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n/i18n";
import { COLORS } from "../../styles/colors";
import InputField from "../../components/InputField";
import { StyledButton } from "../../components/StyledButton";
import AsyncStorage from "@react-native-community/async-storage";
import * as Random from "expo-random";


export default class InitProfileScreen extends Component {
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
      this.props.navigation.navigate("Init4");
    } else {
      Alert.alert(t("ERROR"), t("ALL_FIELDS_REQUIRED"));
    }
  };

  render() {
    return (
      <View style={s.container}>
        <View style={s.top}>
          <Text style={s.title}>{t("YOUR_PROFILE")}</Text>
          <View style={s.underline}></View>
        </View>
        <View s={s.fields}>
          <InputField
            autoCompleteType="name"
            returnKeyType="next"
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            title={t("LASTNAME")}
          />
          <InputField
            autoCompleteType="name"
            returnKeyType="next"
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            title={t("FIRSTNAME")}
          />
          <InputField
            ref={this.input3}
            autoCompleteType="tel"
            returnKeyType="next"
            keyboardType="phone-pad"
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
            title={t("PHONE")}
          />
          <InputField
            ref={this.input4}
            autoCompleteType="street-address"
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address}
            title={t("ADDRESS")}
          />
        </View>
        <View style={s.btn}>
          <StyledButton
            text={t("CREATE")}
            type="primary"
            onPress={this.create}
          />
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
    marginTop: 60,
  },

  underline: {
    width: "20%",
    alignSelf: "center",
    borderTopColor: COLORS.Primary,
    borderTopWidth: 2,
  },
});
