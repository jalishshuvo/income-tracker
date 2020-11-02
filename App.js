import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [gigs, setGigs] = useState([
    {
      description: "freelance job in fiverr",
      amount: 500,
      timestamp: new Date(),
    },
  ]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = gigs.reduce((total, gig) => total + Number(gig.amount), 0);

    setTotal(total);
  }, [gigs]);

  const addGig = () => {
    if (description.length === 0 && amount.length === 0) {
      return;
    }

    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
      },
    ]);

    setDescription("");
    setAmount("");
  };

  return (
    // Try setting `flexDirection` to `column`.
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}> React Native App </Text>
      </View>

      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["27/10/2020", "28/10/2020", "29/10/2020", "30/10/2020"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "orange",
            backgroundGradientFrom: "blue",
            backgroundGradientTo: "green",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <Text> Total Income: $ {total} </Text>

      <TextInput
        placeholder="Description of what you did ?"
        style={styles.todoInput}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TextInput
        keyboardType="numeric"
        style={styles.todoInput}
        value={amount}
        onChangeText={(usd) => setAmount(usd)}
        placeholder="amount you earned in usd ($)"
      />

      <Button
        // disabled={!description && !amount}
        onPress={addGig}
        title="Add Gig"
      />

      {gigs.map((gig) => (
        <View>
          <Text> {gig.description} </Text>
          <Text> {gig.amount} </Text>
        </View>
      ))}
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
    padding: 10,
  },
});
