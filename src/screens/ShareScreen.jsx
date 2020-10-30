import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../components/ProfileCard";
import { StyledButton } from "../components/StyledButton";
import { COLORS } from "../styles/colors";
import { Feather } from "@expo/vector-icons";

export default class ShareScreen extends Component {
  state = {
    profiles: [],
  };

  componentDidMount() {
    this.setState({
      profiles: [
        {
          id: "1",
          lastname: "lastname",
          firstname: "firstname",
          address: "address",
          phone: "phone",
        },
        {
          id: "2",
          lastname: "lastname",
          firstname: "firstname",
          address: "address",
          phone: "phone",
        },
        {
          id: "3",
          lastname: "lastname",
          firstname: "firstname",
          address: "address",
          phone: "phone",
        },
      ],
    });
  }

  render() {
    if (this.state.profiles.length > 0) {
      return (
        <View style={s.container}>
          <StyledButton
            text="Add one"
            type="secondary"
            onPress={() => this.props.navigation.navigate("CreateProfile")}
          />
          <Text style={s.listTitle}> My profiles </Text>
          <SafeAreaView>
            <FlatList
              data={this.state.profiles}
              renderItem={({ item }) => <ProfileCard data={item} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <View style={s.nodataContainer}>
          <Text style={s.nodataText}>You didn't provided any information.</Text>
          <Feather
            name="edit"
            size={128}
            style={s.nodataIcon}
            color={COLORS.LightDark}
            onPress={() => this.props.navigation.navigate("CreateProfile")}
          />
          <Text style={s.nodataText}>
            Tap to create a new information profile.
          </Text>
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
