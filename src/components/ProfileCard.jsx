import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { material, systemWeights } from "react-native-typography";
import { COLORS } from "../styles/colors";
import CheckBox from "@react-native-community/checkbox";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileCard({ data, onDelete, onSelect, delay = 1 }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(
    data.share === 0 ? false : true
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.sequence([
      Animated.delay(delay * 200),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    return () => {
      fadeOut();
    };
  }, []);

  const onToogle = (newValue) => {
    onSelect(data, newValue);
    setToggleCheckBox(newValue);
  };

  const leftRender = (progress, dragX) => {
    let trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton onPress={() => onDelete(data)}>
        <Animated.Text
          style={[s.rectButton, { transform: [{ translateX: trans }] }]}
        >
          <AntDesign name="delete" size={32} color={COLORS.Danger} />
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable overshootLeft={false} renderLeftActions={leftRender}>
      <Animated.View style={[s.container, { opacity: fadeAnim }]}>
        <View style={s.left}>
          <View style={s.line}>
            <Text style={s.lastname}>{data.lastname?.toUpperCase()}</Text>
            <Text style={s.firstname}> {data.firstname}</Text>
          </View>
          <Text style={s.address}>{data.address}</Text>
          <Text style={s.phone}>{data.phone}</Text>
        </View>
        <View style={s.right}>
          <CheckBox
            style={s.checkbox}
            tintColors={{ true: COLORS.Primary, false: COLORS.Dark }}
            tintColor={COLORS.Dark}
            onFillColor={COLORS.Primary}
            onResponderTerminate={COLORS.Primary}
            boxType="square"
            disabled={false}
            value={toggleCheckBox}
            onValueChange={onToogle}
          />
        </View>
      </Animated.View>
    </Swipeable>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Light,
    padding: 8,
    marginBottom: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  rectButton: {
    height: "100%",
    textAlignVertical: "center",
    paddingRight: 20,
    marginLeft: 10,
    borderRightWidth: 1,
    borderRightColor: COLORS.Grey + "11",
    borderRadius: 40,
  },

  right: {
    alignSelf: "center",
  },

  line: {
    flexDirection: "row",
  },
  lastname: {
    ...material.title,
    color: COLORS.Black,
    alignSelf: "flex-end",
  },
  firstname: {
    ...material.subheading,
    ...systemWeights.light,
    color: COLORS.Text,
    alignSelf: "flex-end",
  },
  address: {
    ...material.body1,
    ...systemWeights.thin,
    color: COLORS.Text,
  },
  phone: {
    ...material.body1,
    ...systemWeights.thin,
    color: COLORS.Text,
  },
});
