import React, { Component } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
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

  delete = async (id) => {
    const { store } = this.state;
    const filtered = store.filter((x) => x.id != id);
    this.setState({ store: filtered });
    await AsyncStorage.setItem(
      "@covid-data-share/store",
      JSON.stringify(filtered)
    );
  };

  clear = () => {
    Alert.alert(
      "Warning",
      "Do you really want to delete all of your stored profiles ?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("@covid-data-share/store");
            this.setState({ store: [] });
          },
        },
      ],
      { cancelable: false }
    );
  };

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
        <View style={s.line}>
          <Text style={s.listTitle}>Stored profiles</Text>
          <AntDesign
            style={s.deleteIcon}
            name="delete"
            size={24}
            color={COLORS.LightDark}
            onPress={this.clear}
          />
        </View>
        <SafeAreaView>
          <FlatList
            data={this.state.store}
            renderItem={({ item }) => (
              <ProfileCard onDelete={this.delete} data={item} />
            )}
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

  deleteIcon: {
    textAlignVertical: "center",
    alignSelf: "flex-end",
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
