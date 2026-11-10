import React from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { router } from "expo-router";
import { useMovies } from "../../context/MovieContext";
import { Ionicons } from "@expo/vector-icons";

export default function SavedScreen() {
  const { movies, savedMovieIds, toggleSaved } = useMovies();

  const savedMovies = movies.filter((movie) =>
    savedMovieIds.includes(movie.id),
  );

  const openDetails = (movieId: string) => {
    router.push({
      pathname: "/details",
      params: {
        id: movieId,
      },
    });
  };

  if (savedMovies.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Saved Movies</Text>
          <Text style={styles.subtitle}>Your favorite movies in one place</Text>
        </View>

        <View style={styles.emptyContainer}>
         <Ionicons name="bookmark-outline" size={65} color="#5935D5" />
         
          <Text style={styles.emptyTitle}>No saved movies</Text>

          <Text style={styles.emptySubtitle}>
            Save your favorite movies and find them here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Saved Movies</Text>

        <Text style={styles.subtitle}>{savedMovies.length} movies saved</Text>
      </View>

      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openDetails(item.id)}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.movieImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.movieInfo}
              activeOpacity={0.8}
              onPress={() => openDetails(item.id)}
            >
              <Text style={styles.movieName} numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={styles.movieGenre} numberOfLines={2}>
                {item.genres.join(" • ")}
              </Text>

              <Ionicons name="star" size={15} color="#B8860B" />
              <Text style={styles.rating}>{item.imdbRating}/10</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.unsaveButton}
              activeOpacity={0.7}
              onPress={() => toggleSaved(item.id)}
            >
           <Ionicons name="bookmark" size={23} color="#5935D5" />
             <Text style={styles.unsaveText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8FD",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 45,
    marginBottom: 35,
  },

  title: {
    color: "#171717",
    fontSize: 27,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777777",
    fontSize: 14,
    marginTop: 7,
  },

  listContainer: {
    paddingBottom: 20,
  },

  movieCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
  },

  movieImage: {
    width: 85,
    height: 125,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },

  movieInfo: {
    flex: 1,
    marginLeft: 13,
  },

  movieName: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
  },

  movieGenre: {
    color: "#777777",
    fontSize: 12,
    marginBottom: 10,
  },

  rating: {
    color: "#B8860B",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },

  duration: {
    color: "#555555",
    fontSize: 12,
  },

  unsaveButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginLeft: 5,
  },

  unsaveIcon: {
    color: "#5935D5",
    fontSize: 23,
  },

  unsaveText: {
    color: "#777777",
    fontSize: 10,
    marginTop: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyIcon: {
    color: "#5935D5",
    fontSize: 65,
    marginBottom: 15,
  },

  emptyTitle: {
    color: "#171717",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptySubtitle: {
    color: "#777777",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
});
