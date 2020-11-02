import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import ToDo from "./ToDo";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    // console.log(input);
    setTodos([...todos, input]);
    setInput("");
  };
  return (
    // Try setting `flexDirection` to `column`.
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}> React Native App </Text>

      {/* Hard coded todos */}
      <ToDo title="Jalish" />
      <ToDo title="Mahmud" />
      <ToDo title="shuvo" />

      <ScrollView>
        {todos.map((todo) => (
          <ToDo title={todo} />
        ))}
      </ScrollView>

      <TextInput
        style={styles.todoInput}
        value={input}
        onChangeText={(text) => setInput(text)}
      />

      <Button onPress={addTodo} title="ADD TODO" />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: { padding: 50 },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  todoInput: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    margin: 20,
  },
});
