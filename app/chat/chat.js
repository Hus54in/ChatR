import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome";
import AppwriteClient from '../appwriteclient';

export default function Chat() {
  const userName = "John Doe"; // Replace with dynamic user name if available
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    

    // Subscribe to real-time updates
    try{
    AppwriteClient.client.subscribe(`databases.${AppwriteClient.databaseid}.collections.u2u.documents`, response => {
      console.log('Real-time update:', response);
     if (response.events.includes( "databases.*.collections.*.documents.*.create")) {
       setMessages(prevMessages => [...prevMessages, response.payload]);
       console.log('New message:', response.payload);
     }
   });}
   catch (error) {
     console.error('Error subscribing to real-time updates:', error);
   }

   
  }, []);

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
    <View style={[message.message_box, {alignSelf: 'flex-end',} ]}>
   
    <View style={message.rect}>
    <Text style={message.message}>
    {item.content}
    </Text>
    </View>
  </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.userName}>{userName}</Text>
          <FlatList 
            style={styles.scrollview}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.$id}
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
            {text !== '' ? <Icon name="send" size={30} color="black" onPress={() => setText('')} /> : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
          

const message = StyleSheet.create({
  message: {
    fontFamily: "Georgia-Regular",
    color: "whtie",
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
  },});


const styles = StyleSheet.create({
 container: {
  flex: 1,
  //justifyContent: 'flex-start',
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
  //height: 30,
  borderColor: 'gray',
  borderWidth: 1,
  flex: 1,
  paddingHorizontal: 10,
  alignContent: 'center',
  borderRadius: 10,
},
  text_container: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'bottom',
 
    filter: 'blur(80)',
  },
    scrollview : {
      width: '100%',
      padding: 10,
      //flex: 1,
      backgroundColor: 'white',
    },
});