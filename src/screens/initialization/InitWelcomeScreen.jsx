import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { StyledButton } from "../../components/StyledButton";
import { t } from "../../i18n/i18n";
import { COLORS } from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { material, systemWeights } from "react-native-typography";
import { initStyle } from "../../styles/initStyle";

export default class InitWelcomeScreen extends Component {
  state = {
    titleFade: new Animated.Value(0),
    textFade: new Animated.Value(0),
    buttonFade: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(this.state.titleFade, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.textFade, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.buttonFade, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    return (
      <View style={s.container}>
        <Animated.View
          style={[s.topContainer, { opacity: this.state.titleFade }]}
        >
          <Text style={initStyle.title}>{t("WELCOME")}</Text>
          <Text style={s.on}>{t("ON")}</Text>
          <Text style={initStyle.title}>CODASH</Text>
          <View style={initStyle.underline}></View>
        </Animated.View>
        <View style={s.botContainer}>
          <Animated.View style={{ opacity: this.state.textFade }}>
            <Text style={initStyle.text}>{t("INIT_START")}</Text>
          </Animated.View>
          <Animated.View style={[s.btn, { opacity: this.state.buttonFade }]}>
            <StyledButton
              onPress={() => this.props.navigation.navigate("Init2")}
              text={
                <>
                  {t("BEGIN")}{" "}
                  <AntDesign name="arrowright" size={18} color={COLORS.White} />
                </>
              }
              type="primary"
            />
          </Animated.View>
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

  on: {
    ...material.body1,
    ...systemWeights.light,
    color: COLORS.Dark,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  botContainer: {
    flex: 1,
  },

  btn: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
