import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, Animated } from "react-native";
import { t } from "../../i18n/i18n";
import { COLORS } from "../../styles/colors";
import InputField from "../../components/InputField";
import { StyledButton } from "../../components/StyledButton";
import AsyncStorage from "@react-native-community/async-storage";
import * as Random from "expo-random";
import { initStyle } from "../../styles/initScreens";

export default class InitProfileScreen extends Component {
  state = {
    lastname: "",
    firstname: "",
    phone: "",
    address: "",
    titleFade: new Animated.Value(0),
    fieldsFade: new Animated.Value(0),
    buttonFade: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(this.state.titleFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.fieldsFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.buttonFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }

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
        <Animated.View style={[s.top, { opacity: this.state.titleFade }]}>
          <Text style={[initStyle.title, { marginTop: 60 }]}>
            {t("YOUR_PROFILE")}
          </Text>
          <View style={initStyle.underline}></View>
        </Animated.View>
        <Animated.View style={{ opacity: this.state.fieldsFade }}>
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
        </Animated.View>
        <Animated.View style={{ opacity: this.state.buttonFade }}>
          <StyledButton
            text={t("CREATE")}
            type="primary"
            onPress={this.create}
          />
        </Animated.View>
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
});
