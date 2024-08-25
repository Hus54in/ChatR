import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome";
import ChatManagerPool from './chatsmanagerpool'; // Ensure ChatManagerPool is imported correctly
import AppwriteClient from '../appwriteclient'; // Import AppwriteClient
import { ID } from 'react-native-appwrite'; // Import ID from react-native-appwrite



export default function Chat() {
  const userName = "John Doe"; // Replace with dynamic user name if available
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const [messages, setMessages] = useState([]);
  const collectionID = "u2u"; // Replace with actual collection ID
  const [userid, setUserID] = useState('');
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Initialize ChatManager
        const chatManager = await ChatManagerPool.getChatManager(collectionID);
        console.log(`ChatManager for collection: ${collectionID}`, chatManager);
        // Fetch initial messages
        const chats = await chatManager.getAllChats();
        setMessages(chats);
        const user = await AppwriteClient.account.get();
        setUserID( user)
        // Subscribe to chat updates
        chatManager.subscribeToChat();
        chatManager.addSubscriber(setMessages);

      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, [collectionID]);

  const getPaddingBottom = () => {
    if (isFocused) {
      return 5;
    }
    return Platform.OS === 'ios' ? 40 : 30;
  };

  const handleContentSizeChange = (contentSize) => {
    setInputHeight(contentSize.height);
  };

  const renderItem = ({ item }) => (
  
     <View style={[message.message_box, item.senderID === userid.$id ? {alignSelf : 'flex-end'} : {alignSelf: 'flex-start'}]}>
      <View style={message.rect}>
        <Text style={message.message}>
          {item.content}
        </Text>
      </View>
    </View>
  );

  const handleSend = async () => {
    try{
      console.log('senderi=d', userid.$id)
    await AppwriteClient.database.createDocument(AppwriteClient.databaseid, collectionID, ID.unique(), {"senderid":userid.$id, 'content': text})}
    catch(e){
      console.error("Error sending message:", e);
    }
    setText('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.userName}>{userName}</Text>
          <FlatList 
            style={styles.scrollview}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.messageID}
          />
          <View style={styles.chatContainer}>
            <TextInput
              style={[styles.textInput, { marginBottom: getPaddingBottom() }, { height: Math.min(Math.max(35, inputHeight), 150) }]}
              value={text}
              onChangeText={setText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              multiline={true}
              onContentSizeChange={(e) => handleContentSizeChange(e.nativeEvent.contentSize)}
            />
            {text !== '' ? <Icon name="send" size={30} color="black" onPress={handleSend} /> : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const message = StyleSheet.create({
  message: {
    fontFamily: "Georgia-Regular",
    color: "white",
    padding: 10,
  },
  rect: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "teal",
    borderRadius: 14,
  },
  message_box: {
    color: "white",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    backgroundColor: 'teal',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    alignContent: 'center',
    borderRadius: 10,
  },
  scrollview: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
});
