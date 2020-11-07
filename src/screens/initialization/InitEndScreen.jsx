import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { StyledButton } from "../../components/StyledButton";
import { t } from "../../i18n/i18n";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";

export default class InitEndScreen extends Component {
  state = {
    titleFade: new Animated.Value(0),
    textFade: new Animated.Value(0),
    buttonFade: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(this.state.titleFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.textFade, {
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

  end = async () => {
    await AsyncStorage.setItem("@covid-data-share/isAppInited", "true");
    this.props.navigation.navigate("Init1");
  };

  render() {
    return (
      <View style={s.container}>
        <Animated.View style={{ opacity: this.state.titleFade }}>
          <Text style={s.title}>{t("CONGRAT")}</Text>
          <View style={s.underline}></View>
        </Animated.View>
        <Animated.Text style={[s.text, { opacity: this.state.textFade }]}>
          {t("INIT_FINISH")}
        </Animated.Text>
        <Animated.View style={{ opacity: this.state.buttonFade }}>
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
        </Animated.View>
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
