import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AppwriteClient from "../appwriteclient";

const HomePage = ({ user, onLogout }) => {
  return (
    <View style={styles.root}>
      <Text>{`Logged in as ${user.name}`}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await AppwriteClient.account.deleteSession("current");
          onLogout();
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

export default HomePage;
