import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import User from "../interfaces/User.interface";

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
  text: String;
}

interface Pokemon {
  name: string;
  numberOfAbilites: number;
  baseExperience: number;
  imageUrl: string;
}

export class PokemonSearch extends Component<User, SearchState> {
  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null,
      text: "",
    };
  }
  _onPressButton = (): void => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.text}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilites: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default,
          },
        });
      });
    });
  };
  render() {
    const { name: userName } = this.props;
    const { error, pokemon } = this.state;

    let resultMarkup;

    if (error) {
      resultMarkup = (
        <Text style={{ fontSize: 20 }}>
          Pokemon not found, please try again
        </Text>
      );
    } else if (this.state.pokemon) {
      resultMarkup = (
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: pokemon.imageUrl }}
          />
          <Text style={{ fontSize: 20 }}>
            has {pokemon.numberOfAbilites} abilities and{" "}
            {pokemon.baseExperience} base experience points
          </Text>
        </View>
      );
    }

    return (
      <View>
        <View>
          <Text style={{ fontSize: 20 }}>
            {userName} search pokemon by number
          </Text>
        </View>
        <View style={styles.searchInput}>
          <TextInput
            style={{ fontSize: 16 }}
            placeholder="Type here number of pokemon!"
            onChangeText={text => this.setState({ text })}
          />
        </View>

        <View style={styles.searchButton}>
          <Button onPress={this._onPressButton} title="Search" />
        </View>
        {resultMarkup}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  searchButton: {
    height: 50,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

export default PokemonSearch;
