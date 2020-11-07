import React, { Component, useRef, createRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StyledButton } from "../../components/StyledButton";
import { t } from "../../i18n/i18n";
import { COLORS } from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

export default class InitWelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  };

  render() {
    return (
      <View style={s.container}>
        <View style={s.topContainer}>
          <Text style={s.title}>{t("WELCOME")}</Text>
          <Text style={s.on}>{t("ON")}</Text>
          <Text style={s.title}>CODASH</Text>
          <View style={s.underline}></View>
        </View>
        <View style={s.botContainer}>
          <Animated.View style={{ opacity: this.state.fadeAnim }}>
            <Text style={s.text}>{t("INIT_START")}</Text>
          </Animated.View>
          <View style={s.btn}>
            <StyledButton
              onPress={() => this.props.navigation.navigate("Init2")}
              text={
                <>
                  {t("BEGIN")}{" "}
                  <AntDesign name="arrowright" size={24} color={COLORS.White} />
                </>
              }
              type="primary"
            />
          </View>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  topContainer: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 36,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
  },

  on: {
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
    marginTop: 40,
  },

  underline: {
    width: "20%",
    alignSelf: "center",
    borderTopColor: COLORS.Primary,
    borderTopWidth: 2,
  },

  botContainer: {
    flex: 1,
  },

  btn: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
