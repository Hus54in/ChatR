import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';

export default function SearchUserScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.chats_heading}>Search User</Text>
      <View style={styles.input_field}>
                <TextInput
                  style={styles.input}
                  placeholder="Search User"
                  //secureTextEntry
                  autoComplete="password"
                  autoCapitalize="none"
                  ref={this.passwordInputRef}
                  onChangeText={(password) => this.setState({ password })}
                />
              </View>
    </View>

  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  chats_heading: {
    marginTop: 70,
    marginHorizontal: 10,
    alignItems: "left",
    fontSize: 40,
    fontStyle: "bold",
    color: "white",
  },
  input_field: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
    marginTop: 9,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
});