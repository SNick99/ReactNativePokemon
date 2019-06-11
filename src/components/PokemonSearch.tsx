import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import User from "../interfaces/User.interface";
import Pokemon from "../interfaces/Pokemon.interface";

interface SearchState {
  error: boolean;
  pokemon: Pokemon | null;
  text: string;
}

export class PokemonSearch extends Component<User, SearchState> {
  state = {
    error: false,
    pokemon: null,
    text: "",
  };

  private onPressButton = (): void => {
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

  private handleChangeText = (text: string): void => {
    this.setState({ text });
  };

  render() {
    const { name: userName } = this.props;
    const { error, pokemon } = this.state;

    let resultMarkup;

    if (error) {
      resultMarkup = (
        <Text style={styles.allText}>Pokemon not found, please try again</Text>
      );
    } else if (this.state.pokemon) {
      resultMarkup = (
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.pokemonImage}
            source={{ uri: pokemon.imageUrl }}
          />
          <Text style={styles.allText}>
            has {pokemon.numberOfAbilites} abilities and{" "}
            {pokemon.baseExperience} base experience points
          </Text>
        </View>
      );
    }

    return (
      <View>
        <View>
          <Text style={styles.allText}>
            {userName} search pokemon by number
          </Text>
        </View>
        <View style={styles.searchInput}>
          <TextInput
            placeholder="Type here number of pokemon!"
            onChangeText={text => {
              this.handleChangeText(text);
            }}
          />
        </View>

        <View style={styles.searchButton}>
          <Button onPress={this.onPressButton} color="#841584" title="Search" />
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
    backgroundColor: "red",
    borderWidth: 1,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  allText: {
    fontSize: 20,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
});

export default PokemonSearch;
