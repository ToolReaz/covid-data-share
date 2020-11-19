import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { material, systemWeights } from "react-native-typography";
import { COLORS } from "../styles/colors";
import CheckBox from "@react-native-community/checkbox";

export default function ProfileCard({ data, onDelete, onSelect }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(
    data.share === 0 ? false : true
  );

  const onToogle = (newValue) => {
    onSelect(data, newValue);
    setToggleCheckBox(newValue);
  };

  return (
    <View style={s.container}>
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
    </View>
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

  right: {
    alignSelf: "center",
  },

  checkbox: {},

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
