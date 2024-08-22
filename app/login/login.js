import React, { Component } from "react";
import { Molengo_400Regular } from "@expo-google-fonts/molengo";
import { NotoSansGeorgian_400Regular } from "@expo-google-fonts/noto-sans-georgian";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppwriteClient from "../appwriteclient";



export default class LoginPage extends Component {
  
  

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      loggedInUser: null,
    };

    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  async componentDidMount() {
    const session = await AsyncStorage.getItem("appwriteSession");
    if (session) {
      try {
        const user = await AppwriteClient.account.get();
        this.setState({ loggedInUser: user });
      } catch (error) {
       // console.error("Failed to fetch user", error);
      }
    }
  }

  navigateToRegister = () => {
    this.props.navigation.navigate("Register");
  };

  login = async () => {
    console.log("Logging in");
    const { email, password } = this.state;
    try {
      const session = await AppwriteClient.account.createEmailPasswordSession(
        email,
        password
      );
      await AsyncStorage.setItem("appwriteSession", JSON.stringify(session));
      const user = await AppwriteClient.account.get();
      this.setState({ loggedInUser: user });
      this.props.onLoginSuccess(user); // Notify parent component of successful login
      this.props.navigation.navigate("Home"); // Navigate to HomePage
    } catch (error) {
      console.error("Failed to login", error);
    }
  };



  render() {
    return (
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.welcomeTo2Stack}>
              <Text style={styles.welcomeTo2}>Welcome to</Text>
              <Text style={styles.chatR}>ChatR</Text>
            </View>
            <View style={styles.message_box}>
              <Text style={styles.message}>
                Chat with your friends, knowing your chats are not to be snooped
                around
              </Text>
              <View style={styles.rect}>
                <Icon name="lock" style={styles.icon}></Icon>
              </View>
            </View>
            <View style={styles.login}>
              <View style={styles.input_field}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  autoComplete="email"
                  inputMode="email"
                  ref={this.emailInputRef}
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>
              <View style={styles.input_field}>
                <TextInput
                  style={styles.input}
                  placeholder="password"
                  //secureTextEntry
                  autoComplete="password"
                  autoCapitalize="none"
                  ref={this.passwordInputRef}
                  onChangeText={(password) => this.setState({ password })}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, styles.login_button]}
                onPress={this.login}
              >
                <Text style={styles.buttontext}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.register_button]}
                onPress={this.navigateToRegister}
              >
                <Text style={styles.buttontext}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    marginTop: 300,
  },
  input_field: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    height: 60,
    marginTop: 9,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  login_button: {
    height: 44,

    borderRadius: 11,
    marginTop: 28,
    marginHorizontal: 10,
  },
  register_button: {
    height: 44,

    borderRadius: 11,
    backgroundColor: "rgba(132,127,127,1)",
    marginTop: 10,
    marginHorizontal: 10,
  },
  welcomeTo2: {
    top: 0,
    left: 6,
    position: "absolute",
    fontFamily: "Molengo-Regular",
    color: "#121212",
    fontSize: 28,
  },
  chatR: {
    top: 21,
    left: 0,
    position: "absolute",
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 79,
  },
  welcomeTo2Stack: {
    width: 212,
    height: 113,
    marginTop: 100,
    marginLeft: 25,
  },
  message: {
    top: 16,
    left: 11,
    position: "absolute",
    fontFamily: "Georgia-Regular",
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
    marginLeft: 27,
  },
  button: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttontext: {
    color: "#fff",
    fontSize: 17,
  },
});
