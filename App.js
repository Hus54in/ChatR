import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./app/login/login";
import HomePage from "./app/home/homepage";
import AppwriteClient from "./app/appwriteclient";
import ProfileScreen from "./app/home/profile";
import SearchUserScreen from "./app/search_user/search_user";
import Register from "./app/login/register";
import Chat from "./app/chat/chat";
import ChatManagerPool from "./app/chat/chatsmanagerpool";

const Stack = createStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  
  

  useEffect(() => {


    // Check if user is logged in
    const getUser = async () => {
      try {
        const user = await AppwriteClient.account.get();
        ChatManagerPool.chatManagers = new Map();
        ChatManagerPool.startPool(); // Start the pool
        setLoggedInUser(user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    getUser();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedInUser ? (
          <Stack.Screen name="Home">
            {(props) => <Chat {...props} navigation={Stack} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginPage
                {...props}
                onLoginSuccess={(user) => setLoggedInUser(user)}
              />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login_page">
          {(props) => (
            <LoginPage
              {...props}
              onLoginSuccess={(user) => setLoggedInUser(user)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Search" component={SearchUserScreen} />
        <Stack.Screen name="Register">
          {(props) => <Register {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
