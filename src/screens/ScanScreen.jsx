import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  const handleScan = ({ data }) => {
    setScanned(true);
    Alert.alert("Scanned", data);
  };

  if (hasPermission === null)
    return <Text style={s.text}>Requesting ccamera permission...</Text>;

  if (hasPermission === false)
    return <Text style={s.text}>No access to camera.</Text>;

  return (
    <View style={s.container}>
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
});
