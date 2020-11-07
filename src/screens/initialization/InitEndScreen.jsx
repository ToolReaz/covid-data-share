import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StyledButton } from "../../components/StyledButton";
import { t } from "../../i18n/i18n";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";

export default class InitEndScreen extends Component {
  end = async () => {
    await AsyncStorage.setItem("@covid-data-share/isAppInited", "true");
    this.props.navigation.navigate("Init1");
  };

  render() {
    return (
      <View style={s.container}>
        <View style={s.top}>
          <Text style={s.title}>{t("CONGRAT")}</Text>
          <View style={s.underline}></View>
        </View>
        <Text style={s.text}>{t("INIT_FINISH")}</Text>
        <View style={s.bot}>
          <StyledButton
            onPress={this.end}
            text={
              <>
                {t("LETS_GO")}{" "}
                <AntDesign name="arrowright" size={24} color={COLORS.White} />
              </>
            }
            type="primary"
          />
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontFamily: "RobotoLight",
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
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
  },
});
