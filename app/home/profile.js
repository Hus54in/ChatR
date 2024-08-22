import React from 'react';
import {  View, Text,TouchableOpacity, StyleSheet  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppwriteClient from "../appwriteclient";
export default function ProfileScreen( ) {
  const navigation = useNavigation(); // Use the useNavigation hook

    return (
        <View style={styles.root}>
         <TouchableOpacity onPress={async () => {
          navigation.navigate("Home");
         }}> 
          <Text style={[styles.back, styles.top]}>&lt;</Text>  
         </TouchableOpacity >
        <Text style={ styles.chats_heading}>Profile Screen</Text>
        <Text style={{color:"white"}}>Welcome {AppwriteClient.account.name}</Text>
        <TouchableOpacity
  style={styles.button}
  onPress={async () => {
   await AppwriteClient.account.deleteSession("current");
    navigation.navigate("Login_page");
  }}
>
  <Text>Logout</Text>
</TouchableOpacity>
        </View>
    );
    }


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
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
  back:{
    color: "white",
    fontSize: 30,
  },
  chats_heading:{
    alignItems: "left",
    fontSize: 40,
    fontStyle: "bold",
    color: "white",
  },

  button: {
    backgroundColor: "gray",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },});