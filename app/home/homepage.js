import React from "react";
import { StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Chat from "../chat/chat";

const HomePage = () => {
  const navigation = useNavigation(); // Use the useNavigation hook

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.chats_heading}>{`Chat`}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight
            style={[styles.profileImgContainer, { borderColor: 'green', borderWidth: 1 }]}
            onPress={() => {
              navigation.navigate("Profile"); // Navigate to ProfileScreen
              console.log('Profile image pressed');
            } }
          >
            <Image source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=pixel" }} style={styles.profileImgContainer} />
          </TouchableHighlight>
        </View>
      </View>
    <Chat />
    </View>
)};

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
    borderBottomColor: "grey",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
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
