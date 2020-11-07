import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n/i18n";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

export default class InitChoiceScreen extends Component {
  client = async () => {
    await AsyncStorage.setItem("@covid-data-share/userType", "client");
    this.props.navigation.navigate("Init3");
  };

  worker = async () => {
    await AsyncStorage.setItem("@covid-data-share/userType", "worker");
    this.props.navigation.navigate("Init4");
  };

  render() {
    return (
      <View style={s.container}>
        <View style={s.top}>
          <View>
            <Text style={s.title}>{t("ARE_YOU")}</Text>
            <View style={s.underline}></View>
          </View>
          <View>
            <TouchableOpacity onPress={this.client}>
              <AntDesign
                style={s.icon}
                name="user"
                size={84}
                color={COLORS.Dark}
              />
              <Text style={s.text}>{t("CLIENT")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.bot}>
          <TouchableOpacity onPress={this.worker}>
            <Entypo style={s.icon} name="shop" size={84} color={COLORS.White} />
            <Text style={{ ...s.text, color: COLORS.White }}>
              {t("WORKER")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  top: {
    flex: 1,
    justifyContent: "space-around",
  },
  bot: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
  },
  xxx: {},

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
    fontSize: 24,
    fontFamily: "RobotoBold",
    color: COLORS.Dark,
    textAlign: "center",
  },

  icon: {
    textAlign: "center",
  },
});
