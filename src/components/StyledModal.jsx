import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";

export default function StyledModal({ show, onClose, children }) {
  return (
    <Modal transparent visible={show}>
      <View style={s.modal}>
        <View style={s.modalInner}>
          <Text onPress={onClose} style={s.modalClose}>
            Close
            <AntDesign name="close" size={20} color={COLORS.LightDark} />
          </Text>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
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
});
