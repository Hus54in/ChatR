import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./app/login/login";
import HomePage from "./app/home/homepage";
import AppwriteClient from "./app/appwriteclient";
import ProfileScreen from "./app/home/profile";
import SearchUserScreen from "./app/search_user/search_user";

const Stack = createStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AppwriteClient.account.get();
        setLoggedInUser(user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    getUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        {loggedInUser ? (
          <Stack.Screen name="Home" >
            {(props) => (
              <HomePage {...props} 
              navigation={Stack}/>
              
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="l">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
