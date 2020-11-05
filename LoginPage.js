import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "shuvo" && password === "admin") {
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      <Text> Login Page</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Enter your username"
      ></TextInput>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry={true}
      ></TextInput>

      <Button title="Login" onPress={login} />

      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    padding: 10,
  },
});
