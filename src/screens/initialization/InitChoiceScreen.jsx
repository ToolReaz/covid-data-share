import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { t } from "../../i18n/i18n";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { initStyle } from "../../styles/initStyle";

export default class InitChoiceScreen extends Component {
  state = {
    titleFade: new Animated.Value(0),
    clientFade: new Animated.Value(0),
    workerFade: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(this.state.titleFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.clientFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.workerFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }

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
          <Animated.View style={{ opacity: this.state.titleFade }}>
            <Text style={initStyle.title}>{t("ARE_YOU")}</Text>
            <View style={initStyle.underline}></View>
          </Animated.View>
          <Animated.View style={{ opacity: this.state.clientFade }}>
            <TouchableOpacity onPress={this.client}>
              <AntDesign
                style={s.icon}
                name="user"
                size={84}
                color={COLORS.Dark}
              />
              <Text style={initStyle.iconText}>{t("CLIENT")}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View style={[s.bot, { opacity: this.state.workerFade }]}>
          <TouchableOpacity onPress={this.worker}>
            <Entypo style={s.icon} name="shop" size={84} color={COLORS.White} />
            <Text style={{ ...initStyle.iconText, color: COLORS.White }}>
              {t("WORKER")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
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

  icon: {
    textAlign: "center",
  },
});
