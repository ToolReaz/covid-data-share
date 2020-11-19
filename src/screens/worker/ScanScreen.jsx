import AsyncStorage from "@react-native-community/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import StyledModal from "../../components/StyledModal";
import { COLORS } from "../../styles/colors";
import * as Random from "expo-random";
import { withI18n } from "../../i18n/i18n";
import { t } from "i18n-js";
import { mainStyle } from "../../styles/mainStyle";
import { material, systemWeights } from "react-native-typography";

const ScanScreen = function (props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  const handleScan = async ({ data }) => {
    setScanned(true);

    try {
      const profiles = JSON.parse(data);

      if (profiles && typeof profiles === "object" && profiles.length > 0) {
        if (
          "id" in profiles[0] &&
          "lastname" in profiles[0] &&
          "firstname" in profiles[0] &&
          "phone" in profiles[0] &&
          "address" in profiles[0]
        ) {
          const results = profiles.map((r) => (
            <Text key={r.id} style={s.resultText}>
              {r.lastname.toUpperCase()} {r.firstname}
            </Text>
          ));

          const newProfiles = await Promise.all(
            profiles.map(async (p) => {
              p.id = (await Random.getRandomBytesAsync(8))
                .join("")
                .toString("hex");
              return p;
            })
          );

          const raw = await AsyncStorage.getItem("@covid-data-share/store");
          const store = raw ? JSON.parse(raw) : [];
          const updatedStore = [...store, ...newProfiles];
          await AsyncStorage.setItem(
            "@covid-data-share/store",
            JSON.stringify(updatedStore)
          );

          setScanResult(results);
          setShowModal(true);
        } else {
          Alert.alert(
            "Error",
            "This QR code is not meant to be scanned by this app !",
            [
              {
                text: "OK",
                onPress: () => setScanned(false),
              },
            ]
          );
        }
      }
    } catch (e) {
      Alert.alert(
        "Error",
        "This QR code is not meant to be scanned by this app !",
        [
          {
            text: "OK",
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  if (hasPermission === null)
    return <Text style={mainStyle.text}>{t("REQUESTING_PERM")}</Text>;

  if (hasPermission === false)
    return <Text style={mainStyle.text}>{t("NO_PERM")}</Text>;

  return (
    <View style={s.container}>
      <StyledModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setScanned(false);
        }}
      >
        <Text style={s.modalTitle}>{t("YOU_SCANNED")}:</Text>
        <Text>{scanResult}</Text>
      </StyledModal>
      <Text style={s.text}>{t("PUT_QRCODE")}</Text>
      <BarCodeScanner
        style={s.scanner}
        onBarCodeScanned={scanned ? undefined : handleScan}
      />
      <Text style={s.text}>{t("SCANNING")}</Text>
    </View>
  );
};

export default ScanScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  text: {
    ...material.headline,
    flex: 1,
    color: COLORS.Text,
    textAlign: "center",
    textAlignVertical: "center",
  },

  scanner: {
    flex: 3,
    borderWidth: 3,
    borderColor: COLORS.Primary,
  },

  modalTitle: {
    ...material.headline,
    color: COLORS.Black,
    textAlign: "center",
    marginBottom: 20,
  },

  resultText: {
    ...material.subheading,
    ...systemWeights.light,
    color: COLORS.Text,
    textAlign: "center",
    marginBottom: 12,
  },
});
