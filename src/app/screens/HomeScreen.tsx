import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { router } from "expo-router";
import { useMovies } from "../../context/MovieContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { movies } = useMovies();

  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openDetails = (movieId: string) => {
    router.push({
      pathname: "/details",
      params: {
        id: movieId,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>Movies</Text>
        <Text style={styles.subtitle}>Discover your next movie</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={22} color="#555555" />

        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Movies</Text>

        <Text style={styles.movieCount}>{filteredMovies.length} movies</Text>
      </View>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieCard}
            activeOpacity={0.8}
            onPress={() => openDetails(item.id)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.movieImage} />

            <View style={styles.movieInfo}>
              <Text style={styles.movieName} numberOfLines={2}>
                {item.name}
              </Text>

              <View style={styles.genreContainer}>
                <Ionicons name="film-outline" size={15} color="#777777" />

                <Text style={styles.movieGenre} numberOfLines={1}>
                  {item.genres.join(" • ")}
                </Text>
              </View>

              <View style={styles.ratingContainer}>
                <View style={styles.ratingItem}>
                  <Ionicons name="star" size={15} color="#B8860B" />
                  <Text style={styles.rating}>{item.imdbRating}</Text>
                </View>

                <View style={styles.durationItem}>
                  <Ionicons name="time-outline" size={15} color="#555555" />
                  <Text style={styles.duration}>{item.duration}</Text>
                </View>
              </View>

              <View style={styles.tagsContainer}>
                {item.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Ionicons
                      name="pricetag-outline"
                      size={11}
                      color="#5935D5"
                    />
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#888888" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No movies found</Text>
          </View>
        }
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
    marginBottom: 25,
  },

  logo: {
    color: "#171717",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 0,
  },

  subtitle: {
    color: "#777777",
    fontSize: 14,
    marginTop: 5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
    height: 50,
    borderWidth: 1,
    borderColor: "#E9E6F0",
  },

  searchIcon: {
    color: "#555555",
    fontSize: 25,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    color: "#171717",
    fontSize: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#171717",
    fontSize: 20,
    fontWeight: "bold",
  },

  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  durationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  genreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 12,
  },

  movieCount: {
    color: "#888888",
    fontSize: 13,
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
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  movieImage: {
    width: 95,
    height: 135,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },

  movieInfo: {
    flex: 1,
    marginLeft: 14,
  },

  movieName: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },

  movieGenre: {
    color: "#777777",
    fontSize: 12,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  rating: {
    color: "#B8860B",
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 15,
  },

  duration: {
    color: "#555555",
    fontSize: 12,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E8E3FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },

  tagText: {
    color: "#5935D5",
    fontSize: 10,
    fontWeight: "bold",
  },

  arrow: {
    color: "#333333",
    fontSize: 25,
    marginLeft: 5,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    color: "#777777",
    fontSize: 16,
  },
});
