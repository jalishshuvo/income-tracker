import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";

function HomePage({ navigation }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    { date: moment().format("LL"), amount: 2000 },
    { date: moment().format("LL"), amount: 1000 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(2, "days").format("LL"), amount: 2800 },
    { date: moment().subtract(3, "days").format("LL"), amount: 3000 },
    { date: moment().subtract(4, "days").format("LL"), amount: 400 },
  ]);
  const [gigs, setGigs] = useState([
    {
      description: "freelance job in fiverr",
      amount: 500,
      timestamp: new Date(),
    },
  ]);

  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, "date")));
  }, [data]);

  const transformData = (groupedData) => {
    const transformedArray = [];

    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce(
        (previousValue, currentValue) => previousValue + currentValue.amount,
        0
      );
      transformedArray.push({
        date: moment(entry[0]).format("DD/MM"),
        amount: total,
      });
    });

    const sortedArray = transformedArray.sort((a, b) =>
      moment(a["date"]).diff(moment(b["date"]))
    );

    return sortedArray;
  };

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const getDates = () => transformedData.map((pair) => pair.date);
  const getAmounts = () => transformedData.map((pair) => pair.amount);

  console.log("debug", data);
  console.log("The Date", getDates());
  console.log("The Amount", getAmounts());
  console.log("The Grouped Value", Object.entries(groupBy(data, "date")));
  console.log("Total Grouped Value", transformData(groupBy(data, "date")));

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

    setData([
      ...data,
      {
        date: moment().format("LL"),
        amount: Number(amount),
      },
    ]);

    setDescription("");
    setAmount("");
  };

  return (
    // Try setting `flexDirection` to `column`.
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}> React Native HomePage </Text>
      </View>

      <Button title="Login" onPress={() => navigation.navigate("Login")} />

      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: getDates(),
            datasets: [
              {
                data: getAmounts(),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          // yAxisSuffix="k"
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

export default HomePage;

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
