import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { router } from "expo-router";

import { useMovies } from "../../context/MovieContext";
import type { Movie, MovieTag, MovieGenre } from "../../types/Movie";

const TAG_OPTIONS: MovieTag[] = ["2D", "3D", "IMAX", "4D"];

const GENRE_OPTIONS: MovieGenre[] = [
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Adventure",
  "Thriller",
  "Romance",
  "Animation",
];

export default function AddMovieScreen() {
  const { addMovie } = useMovies();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<MovieTag[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const [imdbRating, setImdbRating] = useState("");
  const [duration, setDuration] = useState("");
  const [rotten, setRotten] = useState("");

  const toggleTag = (tag: MovieTag) => {
    setTags((previousTags) =>
      previousTags.includes(tag)
        ? previousTags.filter((item) => item !== tag)
        : [...previousTags, tag],
    );
  };

  const toggleGenre = (genre: MovieGenre) => {
    setGenres((previousGenres) =>
      previousGenres.includes(genre)
        ? previousGenres.filter((item) => item !== genre)
        : [...previousGenres, genre],
    );
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageUrl("");
    setTags([]);
    setGenres([]);
    setImdbRating("");
    setDuration("");
    setRotten("");
  };

  const handleAddMovie = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !imageUrl.trim() ||
      !imdbRating.trim() ||
      !duration.trim() ||
      !rotten.trim()
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (genres.length === 0) {
      Alert.alert("Error", "Please select at least one genre.");
      return;
    }

    const rating = Number(imdbRating.replace(",", "."));
    const rottenRating = Number(rotten.replace(",", "."));

    if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
      Alert.alert("Error", "IMDb rating must be between 0 and 10.");
      return;
    }

    if (
      !Number.isFinite(rottenRating) ||
      rottenRating < 0 ||
      rottenRating > 100
    ) {
      Alert.alert("Error", "Rotten Tomatoes must be between 0 and 100.");
      return;
    }

    const newMovie: Movie = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      tags,
      genres,
      imdbRating: rating,
      duration: duration.trim(),
      rotten: rottenRating,
    };

    addMovie(newMovie);

    resetForm();

    Alert.alert("Success", "Movie added successfully!", [
      {
        text: "OK",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Add New Movie</Text>
            <Text style={styles.subtitle}>Enter movie information below</Text>
          </View>

          <Text style={styles.label}>Movie Name *</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter movie name"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description *</Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter movie description"
            placeholderTextColor="#777"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Image URL *</Text>

          <TextInput
            style={styles.input}
            placeholder="https://example.com/image.jpg"
            placeholderTextColor="#777"
            value={imageUrl}
            onChangeText={setImageUrl}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Movie Tags</Text>

          <View style={styles.optionsContainer}>
            {TAG_OPTIONS.map((tag) => {
              const selected = tags.includes(tag);

              return (
                <TouchableOpacity
                  key={tag}
                  style={[styles.option, selected && styles.selectedOption]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.selectedOptionText,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Genres *</Text>

          <View style={styles.optionsContainer}>
            {GENRE_OPTIONS.map((genre) => {
              const selected = genres.includes(genre);

              return (
                <TouchableOpacity
                  key={genre}
                  style={[styles.option, selected && styles.selectedOption]}
                  onPress={() => toggleGenre(genre)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.selectedOptionText,
                    ]}
                  >
                    {genre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>IMDb Rating (0–10) *</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 8.5"
            placeholderTextColor="#777"
            value={imdbRating}
            onChangeText={setImdbRating}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Duration *</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 2h 30m"
            placeholderTextColor="#777"
            value={duration}
            onChangeText={setDuration}
          />

          <Text style={styles.label}>Rotten Tomatoes (0–100%) *</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 85"
            placeholderTextColor="#777"
            value={rotten}
            onChangeText={setRotten}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={handleAddMovie}
          >
            <Text style={styles.addButtonText}>+ Add Movie</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8FD",
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginTop: 15,
    marginBottom: 25,
  },

  title: {
    color: "#171717",
    fontSize: 27,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777777",
    fontSize: 14,
    marginTop: 6,
  },

  label: {
    color: "#171717",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#171717",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E9E6F0",
  },

  textArea: {
    height: 110,
    textAlignVertical: "top",
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E9E6F0",
  },

  selectedOption: {
    backgroundColor: "#E8E3FF",
    borderColor: "#E8E3FF",
  },

  optionText: {
    color: "#777777",
    fontSize: 13,
    fontWeight: "500",
  },

  selectedOptionText: {
    color: "#5935D5",
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#5935D5",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 35,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
