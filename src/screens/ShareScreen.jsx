import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../components/ProfileCard";
import { StyledButton } from "../components/StyledButton";
import { COLORS } from "../styles/colors";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import QRCode from "react-native-qrcode-svg";
import { AntDesign } from "@expo/vector-icons";
import StyledModal from "../components/StyledModal";
import { t } from "../i18n/i18n";

export default class ShareScreen extends Component {
  state = {
    profiles: [],
    showModal: false,
  };

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const raw = await AsyncStorage.getItem("@covid-data-share/profiles");
    if (raw) {
      const profiles = JSON.parse(raw);
      this.setState({ profiles });
    }
  };

  delete = async (id) => {
    const { profiles } = this.state;
    const filtered = profiles.filter((x) => x.id != id);
    this.setState({ profiles: filtered });
    await AsyncStorage.setItem(
      "@covid-data-share/profiles",
      JSON.stringify(filtered)
    );
  };

  share = () => {
    this.setState({ showModal: true });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  createProfile = () => {
    this.props.navigation.navigate("CreateProfile", {
      onGoBack: this.getData,
    });
  };

  render() {
    if (this.state.profiles.length > 0) {
      return (
        <View style={s.container}>
          <StyledModal
            transparent
            onClose={this.close}
            show={this.state.showModal}
          >
            <QRCode
              style={s.qrcode}
              value={JSON.stringify(this.state.profiles)}
              size={200}
            />
            <Text style={s.modalText}>Show this QR code to the scanner</Text>
          </StyledModal>
          <StyledButton
            text={t("ADD")}
            type="secondary"
            onPress={this.createProfile}
          />
          <Text style={s.listTitle}>{t("MY_PROFILES")}</Text>
          <SafeAreaView>
            <FlatList
              data={this.state.profiles}
              renderItem={({ item }) => (
                <ProfileCard onDelete={this.delete} data={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <StyledButton text={t("SHARE")} type="primary" onPress={this.share} />
        </View>
      );
    } else {
      return (
        <View style={s.nodataContainer}>
          <Text style={s.nodataText}>{t("NO_PROFILE")}</Text>
          <Feather
            name="edit"
            size={128}
            style={s.nodataIcon}
            color={COLORS.LightDark}
            onPress={() => this.props.navigation.navigate("CreateProfile")}
          />
          <Text style={s.nodataText}>{t("TAP_HERE")}</Text>
        </View>
      );
    }
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  modal: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000088",
  },

  modalInner: {
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: COLORS.White,
    borderRadius: 24,
    elevation: 5,
    alignItems: "center",
  },

  modalClose: {
    fontSize: 18,
    fontFamily: "RobotoRegular",
    color: COLORS.LightDark,
    textAlign: "right",
    textAlignVertical: "top",
    marginBottom: 20,
    width: "100%",
  },

  modalText: {
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: COLORS.LightDark,
    textAlign: "center",
    marginTop: 20,
  },

  listTitle: {
    fontFamily: "RobotoLight",
    fontSize: 18,
    color: COLORS.LightDark,
    marginTop: 20,
  },

  nodataContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-around",
  },

  nodataText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    fontFamily: "RobotoMedium",
    color: COLORS.Dark,
  },

  nodataIcon: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});
