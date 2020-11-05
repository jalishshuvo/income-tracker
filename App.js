import React from "react";
import HomePage from "./HomePage";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./LoginPage";

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            title: "Sign in or Sign Up",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
