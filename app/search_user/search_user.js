import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppwriteClient from '../appwriteclient';
import { Query } from 'react-native-appwrite';

export default function SearchUserScreen() {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState([]);

  const searchUser = async (text) => {
    try {
      const response = await AppwriteClient.database.listDocuments(
        '66c302157b5e7708824c', // databaseId
        '66c306b2000e1ccc322c', // collectionId
        [Query.search('userid', text)],
        10
      );
      const data = response.documents;
      setResult(data);
      console.log(data);
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={item_style.item}>
      <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
      <Text style={{color:"white"}}>{item.name}</Text>
        <Text style={{color:"grey"}}> • {item.userid}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
        <Text style={styles.chats_heading}>Search User</Text>
        <View style={styles.input_field}>
          <View style={styles.input_container}>
            <TextInput
              style={styles.input}
              placeholder="Search User"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity onPress={() => searchUser(searchText)} style={styles.icon_container}>
              <Icon name="search-outline" size={20} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={result}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}



const item_style = StyleSheet.create({
  item: {
    padding: 20,
    borderRadius: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  chats_heading: {
    marginTop: 70,
    marginHorizontal: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  input_field: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  result: {
    color: 'white',
  },
  icon_container: {
    padding: 10,
  },
});