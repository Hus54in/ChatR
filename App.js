import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./app/login/login";
import HomePage from "./app/home/homepage";
import AppwriteClient from "./app/appwriteclient";

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedInUser ? (
          <Stack.Screen name="Home" hea>
            {(props) => (
              <HomePage
                {...props}
                user={loggedInUser}
                onLogout={() => setLoggedInUser(null)}
              />
            )}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
