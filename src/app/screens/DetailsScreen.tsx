import React from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { router, useLocalSearchParams } from "expo-router";
import { useMovies } from "../../context/MovieContext";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { movies, savedMovieIds, toggleSaved } = useMovies();

  const movie = movies.find((item) => item.id === id);

  const isSaved = movie ? savedMovieIds.includes(movie.id) : false;

  if (!movie) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Movie not found</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Movie Details</Text>
        </View>

        <Image source={{ uri: movie.imageUrl }} style={styles.movieImage} />

        <View style={styles.content}>
          <Text style={styles.movieName}>{movie.name}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.imdbLabel}>IMDb</Text>
              <Text style={styles.imdbRating}>{movie.imdbRating}/10</Text>
            </View>

            <View style={styles.rottenBox}>
              <View style={styles.rottenHeader}>
                <Svg width={22} height={22} viewBox="0 0 24 24">
                  <Path
                    d="M12 8C9 6 5 6.5 3.8 9.5C2 13.5 4.5 19.5 9 20.5C10.5 21 12 20 12 20C12 20 13.5 21 15 20.5C19.5 19.5 22 13.5 20.2 9.5C19 6.5 15 6 12 8Z"
                    fill="#E53935"
                  />
                  <Path
                    d="M12 8C10 5 8 4.5 6 5C7 7 9 8 12 8C11 5 12 3 13 2C14 5 13 7 12 8ZM12 8C14 5 17 5 19 6C17 8 15 8.5 12 8Z"
                    fill="#43A047"
                  />
                </Svg>

                <Text style={styles.rottenLabel}>Rotten Tomatoes</Text>
              </View>

              <Text style={styles.rottenRating}>{movie.rotten}%</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
              <Ionicons name="time-outline" size={20} color="#AAAAAA" />
              <Text style={styles.infoLabel}>Duration</Text>
            </View>

            <Text style={styles.infoValue}>{movie.duration}</Text>
          </View>
          <Text style={styles.sectionTitle}>Genres</Text>

          <View style={styles.tagsContainer}>
            {movie.genres.map((genre) => (
              <View key={genre} style={styles.tag}>
                <Text style={styles.tagText}>{genre}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Available Formats</Text>

          <View style={styles.tagsContainer}>
            {movie.tags.map((tag) => (
              <View key={tag} style={styles.formatTag}>
                <Text style={styles.formatText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Description</Text>

          <Text style={styles.description}>{movie.description}</Text>

          <TouchableOpacity
            style={[styles.saveButton, isSaved && styles.savedButton]}
            activeOpacity={0.8}
            onPress={() => toggleSaved(movie.id)}
          >
            <Text style={styles.saveButtonText}>
              {isSaved ? "✓  Saved" : "+  Save Movie"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 35,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },

  movieImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    backgroundColor: "#252525",
  },
  rottenHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  content: {
    padding: 20,
  },

  movieName: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 20,
  },

  ratingContainer: {
    flexDirection: "row",
    marginBottom: 25,
    gap: 15,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBox: {
    flex: 1,
    backgroundColor: "#202020",
    padding: 15,
    borderRadius: 12,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  imdbLabel: {
    color: "#F5C518",
    fontSize: 13,
    fontWeight: "bold",
  },

  imdbRating: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 5,
  },

  rottenBox: {
    flex: 1,
    backgroundColor: "#202020",
    padding: 15,
    borderRadius: 12,
  },

  rottenLabel: {
    color: "#999999",
    fontSize: 12,
  },

  rottenRating: {
    color: "#4CAF50",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 5,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },

  infoLabel: {
    color: "#999999",
    fontSize: 15,
  },

  infoValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 12,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#292929",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 8,
  },

  tagText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  formatTag: {
    backgroundColor: "#351719",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 8,
  },

  formatText: {
    color: "#E50914",
    fontSize: 13,
    fontWeight: "bold",
  },

  description: {
    color: "#AAAAAA",
    fontSize: 15,
    lineHeight: 24,
  },

  saveButton: {
    backgroundColor: "#E50914",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  savedButton: {
    backgroundColor: "#267A42",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
});
