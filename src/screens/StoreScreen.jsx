import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../components/ProfileCard";
import { StyledButton } from "../components/StyledButton";
import { COLORS } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

export default class StoreScreen extends Component {
  state = {
    store: [],
  };

  async componentDidMount() {
    const raw = await AsyncStorage.getItem("@covid-data-share/store");
    if (raw) {
      const store = JSON.parse(raw);
      this.setState({ store });
    }
  }

  print = () => {};

  exportPdf = () => {};

  render() {
    return (
      <View style={s.container}>
        <View style={s.line}>
          <View style={s.button} onPress={this.print}>
            <AntDesign name="printer" size={48} color={COLORS.Dark} />
            <Text style={s.buttonText}>Print</Text>
          </View>
          <View style={[s.button, { marginLeft: 16 }]} onPress={this.exportPdf}>
            <AntDesign name="pdffile1" size={48} color={COLORS.Dark} />
            <Text style={s.buttonText}>Export pdf</Text>
          </View>
        </View>
        <Text style={s.listTitle}> Stored profiles </Text>
        <SafeAreaView>
          <FlatList
            data={this.state.store}
            renderItem={({ item }) => <ProfileCard data={item} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <StyledButton text="Select all" type="secondary" />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    padding: 16,
  },

  line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    alignItems: "center",
    borderColor: COLORS.LightDark,
    borderWidth: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "RobotoMedium",
    color: COLORS.LightDark,
  },

  listTitle: {
    fontFamily: "RobotoLight",
    fontSize: 18,
    color: COLORS.LightDark,
    marginTop: 20,
  },
});
