import React from "react";
import { StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ChatsScreen from "../chats_screen";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomePage = () => {
  const navigation = useNavigation(); // Use the useNavigation hook

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.chats_heading}>{`Chats`}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search"); // Navigate to SearchUserScreen
          }}
          >
            <Text style={styles.add_button}> + </Text>
          </TouchableOpacity>
        <TouchableHighlight
          style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
          onPress={() => {
            navigation.navigate("Profile"); // Navigate to ProfileScreen
            console.log('Profile image pressed');
          }}
        >
          <Image source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=pixel" }} style={styles.profileImgContainer} />
        </TouchableHighlight>
        </View>
      </View>
      <ChatsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  add_button:{
    color: "white",
    fontSize: 30,
  },
  top:{
    marginHorizontal: 10,
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 30,
    width: 30,
    borderRadius: 40,
    
  },
  
  chats_heading:{
    alignItems: "left",
    fontSize: 40,
    fontStyle: "bold",
    color: "white",
  },

});

export default HomePage;
