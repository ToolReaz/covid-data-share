import React, { Component } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";
import { StyledButton } from "../../components/StyledButton";
import { COLORS } from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { t } from "i18n-js";
import { mainStyle } from "../../styles/mainStyle";

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
      t("WARNING"),
      t("DELETE_CONFIRM"),
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

  print = async () => {
    const { store } = this.state;

    let html = "<h1>STORE</h1>";
    store.forEach((p) => {
      html += `<p>LASTNAME: ${p.lastname}  FIRSTNAME: ${p.firstname}  PHONE: ${p.phone}  ADDRESS: ${p.address}</p>`;
    });

    const { uri } = await Print.printToFileAsync({ html });
    await Print.printAsync({ uri });
  };

  exportPdf = async () => {
    const { store } = this.state;

    let html = "<h1>STORE</h1>";
    store.forEach((p) => {
      html += `<p>LASTNAME: ${p.lastname}  FIRSTNAME: ${p.firstname}  PHONE: ${p.phone}  ADDRESS: ${p.address}</p>`;
    });

    const { uri } = await Print.printToFileAsync({ html });
    const permission = await MediaLibrary.requestPermissionsAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
    //Sharing.shareAsync(uri);
  };

  render() {
    return (
      <View style={s.container}>
        <View style={s.line}>
          <View style={s.button}>
            <TouchableOpacity onPressOut={this.print}>
              <AntDesign
                name="printer"
                style={{ textAlign: "center" }}
                size={48}
                color={COLORS.Dark}
              />
              <Text style={mainStyle.iconTitleLD}>{t("PRINT")}</Text>
            </TouchableOpacity>
          </View>
          <View style={[s.button, { marginLeft: 16 }]}>
            <TouchableOpacity onPressOut={this.exportPdf}>
              <AntDesign
                name="pdffile1"
                style={{ textAlign: "center" }}
                size={48}
                color={COLORS.Dark}
              />
              <Text style={mainStyle.iconTitleLD}>{t("EXPORT_PDF")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.line}>
          <Text style={mainStyle.listTitle}>{t("STORED_PROFILES")}</Text>
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
        <StyledButton text={t("SELECT_ALL")} type="secondary" />
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
});
