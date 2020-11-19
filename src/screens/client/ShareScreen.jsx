import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Modal } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
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
import { Entypo } from "@expo/vector-icons";

export default class ShareScreen extends Component {
  state = {
    profiles: [],
    selectedProfiles: [],
    activeShareBtn: false,
    showModal: false,
  };

  componentDidMount() {
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
  }

  select = async (profile, isSelected) => {
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `UPDATE Profiles SET share=? WHERE rowid=?`,
        [isSelected ? 1 : 0, profile.rowid],
        () => {},
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
    SQLite.openDatabase("CODASH").transaction((tx) => {
      tx.executeSql(
        `SELECT lastname, firstname, phone, address FROM Profiles WHERE share=1`,
        [],
        (t, resultSet) => {
          if (resultSet.rows.length > 0) {
            this.setState({
              selectedProfiles: resultSet.rows._array,
              showModal: true,
            });
          }
        },
        console.log
      );
    });
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
              value={JSON.stringify(this.state.selectedProfiles)}
              size={200}
            />
            <Text style={mainStyle.text}>Show this QR code to the scanner</Text>
          </StyledModal>
          <StyledButton
            text={t("ADD") + " +"}
            type="transparent"
            onPress={this.createProfile}
          />
          <Text style={mainStyle.listTitle}>{t("MY_PROFILES")}</Text>
          <FlatList
            data={this.state.profiles}
            onResponderTerminate={null}
            ItemSeparatorComponent={listSeparator}
            renderItem={({ item }) => (
              <ProfileCard
                onDelete={this.delete}
                onSelect={this.select}
                data={item}
              />
            )}
            keyExtractor={(item) => item.rowid.toString()}
          />
          <View style={s.shareBtnView}>
            <StyledButton
              text={
                <>
                  {t("SHARE")}
                  {"  "}
                  <Entypo name="share" size={20} color={COLORS.White} />{" "}
                </>
              }
              type="gradient"
              onPress={this.share}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={s.nodataContainer}>
          <Text style={mainStyle.text}>{t("NO_PROFILE")}</Text>
          <Feather
            name="edit"
            size={128}
            style={s.nodataIcon}
            color={COLORS.Primary}
            onPress={this.createProfile}
          />
          <Text style={mainStyle.text}>{t("TAP_HERE")}</Text>
        </View>
      );
    }
  }
}

const listSeparator = () => (
  <View
    style={{
      width: "90%",
      alignSelf: "center",
      borderBottomColor: COLORS.Grey + "11",
      borderBottomWidth: 1,
      marginBottom: 4,
    }}
  ></View>
);

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 16,
  },

  shareBtnView: {
    marginTop: 8,
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
