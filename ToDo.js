import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ToDo = ({ title }) => {
  return (
    <View style={styles.todo}>
      <Text style={styles.text}> {title} </Text>
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  todo: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
  },
});
