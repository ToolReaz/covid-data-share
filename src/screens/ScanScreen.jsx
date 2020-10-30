import AsyncStorage from "@react-native-community/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import StyledModal from "../components/StyledModal";
import { COLORS } from "../styles/colors";

export default function ScanScreen() {
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

    const profiles = JSON.parse(data);

    if (typeof profiles === "object" && profiles.length > 0) {
      const results = profiles.map((r) => (
        <Text key={r.id} style={s.resultText}>
          {r.lastname.toUpperCase()} {r.firstname}
        </Text>
      ));
      setScanResult(results);
      setShowModal(true);

      const raw = await AsyncStorage.getItem("@covid-data-share/store");
      const store = raw ? JSON.parse(raw) : [];
      const updatedStore = [...store, ...profiles];
      await AsyncStorage.setItem(
        "@covid-data-share/store",
        JSON.stringify(updatedStore)
      );

      setScanned(false);
    }
  };

  if (hasPermission === null)
    return <Text style={s.text}>Requesting ccamera permission...</Text>;

  if (hasPermission === false)
    return <Text style={s.text}>No access to camera.</Text>;

  return (
    <View style={s.container}>
      <StyledModal show={showModal} onClose={() => setShowModal(false)}>
        <Text style={s.modalTitle}>You scanned:</Text>
        <Text>{scanResult}</Text>
      </StyledModal>
      <Text style={s.text}>Put the QR code in front of the camera</Text>
      <BarCodeScanner
        style={s.scanner}
        onBarCodeScanned={scanned ? undefined : handleScan}
      />
      <Text style={s.text}>Scanning...</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  text: {
    flex: 1,
    color: COLORS.LightDark,
    fontSize: 24,
    fontFamily: "RobotoRegular",
    textAlign: "center",
    textAlignVertical: "center",
  },

  scanner: {
    flex: 3,
    borderWidth: 3,
    borderColor: COLORS.Primary,
  },

  modalTitle: {
    color: COLORS.Dark,
    fontSize: 24,
    fontFamily: "RobotoMedium",
    textAlign: "center",
    marginBottom: 20,
  },

  resultText: {
    color: COLORS.LightDark,
    fontSize: 18,
    fontFamily: "RobotoLight",
    textAlign: "center",
    marginBottom: 12,
  },
});
