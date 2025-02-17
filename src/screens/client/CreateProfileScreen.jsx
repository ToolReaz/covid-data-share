import React, { Component, createRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import InputField from "../../components/InputField";
import { StyledButton } from "../../components/StyledButton";
import { t } from "i18n-js";
import * as SQLite from "expo-sqlite";

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
      SQLite.openDatabase("CODASH").transaction((tx) => {
        tx.executeSql(
          `INSERT INTO Profiles(lastname, firstname, phone, address) VALUES (?,?,?,?)`,
          [lastname, firstname, phone, address],
          (t, resultset) => {
            this.props.navigation.goBack();
            this.props.route.params.onGoBack({
              rowid: resultset.insertId,
              share: 0,
              ...this.state,
            });
          },
          console.log
        );
      });
    } else {
      Alert.alert(t("ERROR"), t("ALL_FIELDS_REQUIRED"));
    }
  };

  render() {
    return (
      <View style={s.container}>
        <InputField
          placeholder="Doe"
          autoCompleteType="name"
          returnKeyType="next"
          onChangeText={(lastname) => this.setState({ lastname })}
          value={this.state.lastname}
          title={t("LASTNAME")}
        />
        <InputField
          placeholder="John"
          autoCompleteType="name"
          returnKeyType="next"
          onChangeText={(firstname) => this.setState({ firstname })}
          value={this.state.firstname}
          title={t("FIRSTNAME")}
        />
        <InputField
          placeholder="285 255 488"
          autoCompleteType="tel"
          returnKeyType="next"
          keyboardType="phone-pad"
          onChangeText={(phone) => this.setState({ phone })}
          value={this.state.phone}
          title={t("PHONE")}
        />
        <InputField
          placeholder="24 Blue Street, New York, US"
          autoCompleteType="street-address"
          onChangeText={(address) => this.setState({ address })}
          value={this.state.address}
          title={t("ADDRESS")}
        />
        <StyledButton
          text={t("CREATE")}
          type="gradient"
          onPress={this.create}
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
});
