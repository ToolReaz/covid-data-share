import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";
import { StyledButton } from "../../components/StyledButton";
import { COLORS } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import StyledModal from "../../components/StyledModal";
import { t } from "../../i18n/i18n";
import { mainStyle } from "../../styles/mainStyle";
import * as SQLite from "expo-sqlite";

export default class ShareScreen extends Component {
  state = {
    profiles: [],
    showModal: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = (d) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `SELECT rowid, * FROM Profiles`,
        [],
        (t, resultset) => {
          this.setState({ profiles: resultset.rows._array });
        },
        console.log
      );
    });
  };

  delete = async (id) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `DELETE FROM Profiles WHERE rowid=?`,
        [id],
        () => {
          const { profiles } = this.state;
          const filtered = profiles.filter((x) => x.rowid != id);
          this.setState({ profiles: filtered });
        },
        console.log
      );
    });
  };

  share = () => {
    this.setState({ showModal: true });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  createProfile = () => {
    this.props.navigation.navigate("CreateProfile", {
      onGoBack: (created) => {
        this.setState({ profiles: [...this.state.profiles, created] });
      },
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
            <Text style={mainStyle.text}>Show this QR code to the scanner</Text>
          </StyledModal>
          <StyledButton
            text={t("ADD")}
            type="secondary"
            onPress={this.createProfile}
          />
          <Text style={mainStyle.listTitle}>{t("MY_PROFILES")}</Text>
          <SafeAreaView>
            <FlatList
              data={this.state.profiles}
              renderItem={({ item }) => (
                <ProfileCard
                  onDelete={() => this.delete(item.rowid)}
                  data={item}
                />
              )}
              keyExtractor={(item) => item.rowid.toString()}
            />
          </SafeAreaView>
          <StyledButton text={t("SHARE")} type="primary" onPress={this.share} />
        </View>
      );
    } else {
      return (
        <View style={s.nodataContainer}>
          <Text style={mainStyle.iconTitle}>{t("NO_PROFILE")}</Text>
          <Feather
            name="edit"
            size={128}
            style={s.nodataIcon}
            color={COLORS.LightDark}
            onPress={this.createProfile}
          />
          <Text style={mainStyle.iconTitle}>{t("TAP_HERE")}</Text>
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

  nodataContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-around",
  },

  nodataIcon: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});
