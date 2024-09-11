import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppwriteClient from '../appwriteclient';
import { ID, Permission, Role } from 'react-native-appwrite';
import { Keyboard } from 'react-native';
import CryptoJS from 'crypto-js';
export default function Chat() {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const [messagesDict, setMessagesDict] = useState({});  // Use a dictionary to store messages
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const collectionID = '66e13402001a2c32d75f'; // Replace with your Appwrite collection ID
  const limit = 10; // Number of messages to load at once

  const flatListRef = useRef(null);

 const masterKey = '58896187422209740538875556501590982135749066349028693113185733450739445789845708010586296188294986654899056406893570373493849562497699760156091404216817952383730604442115739118153093337441373570940770884603674794848268682445884436385008870384714306439275259230920388812149242896477848658499103166122783712760228632392957919063061903720238712653329697006175355689269219776519769956947864193285470278701869686477019689868445630349939027411276998903387290512289938412471414765086381501788963490763859611'; // Store this securely
 
 // Convert masterKey to a WordArray
 const key = CryptoJS.enc.Utf8.parse(masterKey);
 const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // 16 bytes IV
 
 function encrypt(text) {
   const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
   return encrypted.toString();
 }
 
 function decrypt(encryptedText) {
   const bytes = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });
   return bytes.toString(CryptoJS.enc.Utf8);
 }


  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Load the initial messages
        loadMessages();

        // Listen to real-time updates for new messages
        const unsubscribe = AppwriteClient.client.subscribe(
          `databases.${AppwriteClient.databaseid}.collections.${collectionID}.documents`,
          (response) => {
      
            if (response.events.includes('databases.*.collections.*.documents.*.create')) {
              const newMessage = response.payload;
              setMessagesDict((prevMessages) => ({
                
                [newMessage.$id]: newMessage,...prevMessages // Add new message to the dictionary
              }));
            }
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, []);

  const loadMessages = async (offset = 0) => {
    try {
      setLoadingMore(true);

      const messagesResponse = await AppwriteClient.database.listDocuments(
        AppwriteClient.databaseid,
        collectionID,
        [`orderDesc("Created")`, `limit(${limit})`, `offset(${offset})`]
      );

      const newMessages = messagesResponse.documents.reduce((acc, message) => {
        acc[message.$id] = message;
        return acc;
      }, {});

      // Merge new messages into the existing dictionary
      setMessagesDict((prevMessages) => ({
        ...prevMessages,
        ...newMessages,
      }));

      // If less than `limit` messages are fetched, mark as no more messages to load
      if (Object.keys(newMessages).length < limit) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMoreMessages = () => {
    if (!loadingMore && hasMoreMessages) {
      loadMessages(Object.keys(messagesDict).length);
    }
  };

  const getPaddingBottom = () => {
    return isFocused ? 5 : Platform.OS === 'ios' ? 40 : 30;
  };

  const handleContentSizeChange = (contentSize) => {
    setInputHeight(contentSize.height);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          message.message_box,
          item.senderID === global.userid ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' },
        ]}
      >
        <View style={[message.rect, item.senderID == global.userid ?   { marginRight: 10 }:{ marginLeft : 20 }]}>
          <Text style={message.message}>{decrypt(item.message)}</Text>
        </View>
      </View>
    );
  };

  const handleSend = async () => {
    try {
      const document = await AppwriteClient.database.createDocument(
        AppwriteClient.databaseid,
        collectionID,
        ID.unique(),
        {
          message: encrypt(text),
          Created: new Date().toISOString(),
        },
        [Permission.read(Role.user(global.userid)), Permission.write(Role.user(global.userid))]
      );

      setMessagesDict((prevMessages) => ({
        ...prevMessages,
        [document.$id]: document,  // Add the new message to the dictionary
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setText('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          style={styles.scrollview}
          data={Object.values(messagesDict)}  // Convert the dictionary to an array
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
          inverted
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.5}
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
    </KeyboardAvoidingView>
  );
}

const message = StyleSheet.create({
  message: {
    fontFamily: "Georgia-Regular",
    color: "white",
  },
  rect: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',          // Align items to the bottom of the container
    backgroundColor: "teal",
    borderRadius: 14,
    padding: 10,
    position: 'relative', // Ensure this container is relatively positioned
  },
  message_box: {
    color: "white",
    marginVertical: 2,
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    borderBottomWidth: 5,
    borderRightWidth: 5,
    
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    padding: 10,
    //paddingBottom: 20,
    alignContent: 'center',
    borderRadius: 10,
  },
  scrollview: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
});
