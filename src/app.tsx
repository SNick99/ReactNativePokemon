import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import PokemonSearch from "./components/PokemonSearch";

export class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Header!!!</Text>
        </View>
        <View style={styles.body}>
          <PokemonSearch name="User" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    marginBottom: 10,
  },
  textHeader: {
    color: "white",
    fontSize: 25,
  },
  body: {
    flex: 0.9,
    paddingHorizontal: 10,
  },
});
