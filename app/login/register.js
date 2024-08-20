import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from 'email-validator';
import AppwriteClient from '../appwriteclient';
import { Query } from 'react-native-appwrite';
import {ID}  from 'react-native-appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const [currentPage, setCurrentPage] = useState('register');
  const [validemail, setValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [useridexsist, setUserIDexsist] = useState(true);
  const [Name, setName] = useState('');
  const [userid, setUserID] = useState('');


  const regsiteruser = async () => {
    try {
      id = ID.unique();
      const response = await AppwriteClient.account.create(id,email,  password, Name);
      const response2 = await AppwriteClient.database.createDocument('66c302157b5e7708824c', '66c306b2000e1ccc322c', id ,  {"userid": userid, "name": Name});
      console.log(response);
      navigation.navigate("Login_page");
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  const handleuserid = async (user) => {
    try {
      thing =  await AppwriteClient.database.listDocuments('66c302157b5e7708824c', // databaseId
      '66c306b2000e1ccc322c',  [Query.equal('userid', user)]);
      if (thing.total == 0) {
        setUserID(user);
      }
      setUserIDexsist(thing.total == 0 );
    }catch(e){
        console.error("Error searching user:", e);
      }} 

  const renderRegisterPage = () => (
    
    <View style={styles.container}>
      <Text style={styles.backToLogin} onPress={() => navigation.navigate("Login_page")}>Back to Login</Text>
      <Text style={styles.register}>Register</Text>
      
      <View style={[styles.message_box, {marginBottom: 40}]}>
        <Text style={styles.message}>
          Let's start by filling out Email and Password!
        </Text>
        <View style={styles.rect}>
          <Icon name="lock" style={styles.icon}></Icon>
        </View>
      </View>

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" 
     value={email}
     onChangeText={(email) => {
       setEmail(email);
       setValidEmail(validate(email));
     }} 
   />

      { validemail ? <View style={{marginBottom: 20}}></View> :  <Text style={styles.error}>Enter valid email</Text>}

      <TextInput value = {password} style={[styles.input, {marginBottom: 20}]} placeholder="Password" onChangeText={(password) => setPassword(password)} />
      
      <TextInput value = {confirmPassword} style={styles.input} placeholder="Confirm Password" onChangeText={(confirmedpassword) => setConfirmPassword(confirmedpassword)} />
      { confirmPassword != password  ? <Text style={styles.error}>Both passwords must be same!</Text> : <View style={{marginBottom: 20, paddingHorizontal: 10}}></View>}

      <TouchableOpacity style={[styles.button, {backgroundColor: !(validemail && password == confirmPassword && (password != '' || confirmPassword != '')) ? 'grey' : '#007AFF'}]} 
      onPress={() =>   setCurrentPage('next')} 
      disabled={!(validemail && password == confirmPassword && (password != '' || confirmPassword != ''))}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNextPage = () => (
   
  
    <View style={styles.container}>
      <Text style={styles.backToLogin} onPress={() => setCurrentPage('register')}>Back</Text>
      <Text style={styles.register}>Register</Text>
      
      <View style={styles.message_box}>
        <Text style={styles.message}>
         Fill out your name and a fire username. 🔥
        </Text>
        <View style={styles.rect}>
          <Icon name="lock" style={styles.icon}></Icon>
        </View>
      </View>

      <TextInput  style={styles.input} placeholder="Username" onChangeText={(userid) =>  handleuserid(userid) } />
       { useridexsist ? <Text style={[styles.error,{color:"green"} ]}>Username Available</Text> : <Text style={styles.error}>Username exists :(</Text>}
      <TextInput value = {Name} style={styles.input} placeholder="Name"  onChangeText={(name) => setName(name) } />
      { Name != '' ? <View style={{marginBottom:"20"}}/> : <Text style={styles.error}>Name cannot be empty :(</Text>}

      <TouchableOpacity style={[styles.button, {backgroundColor: !(useridexsist && Name != '') ? 'grey' : '#007AFF'}]} 
      onPress={() =>   regsiteruser()} 
      disabled={!(useridexsist && Name != '')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {currentPage == 'register' ? renderRegisterPage() : renderNextPage()}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
  },
  register: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  backToLogin: {
    fontSize: 16,
    textAlign: 'left',
    textDecorationLine: 'underline',
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
   
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute', bottom: 20, left: 20, right: 20,position: 'absolute', bottom: 40, left: 20, right: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  message: {
    top: 16,
    left: 11,
    position: "absolute",
    fontFamily: "georgia-regular",
    color: "#121212",
  },
  rect: {
    top: 0,
    left: 0,
    width: 321,
    height: 65,
    position: "absolute",
    backgroundColor: "rgba(30,184,222,0.16)",
    borderRadius: 14,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.28,
    shadowRadius: 0,
  },
  icon: {
    color: "rgba(38,0,255,1)",
    fontSize: 12,
    height: 12,
    width: 8,
    marginTop: 44,
    marginLeft: 303,
  },
  message_box: {
    width: 321,
    height: 65,
    marginTop: 13,
    marginLeft: 10,
    marginBottom: 50,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});