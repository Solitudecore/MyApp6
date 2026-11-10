import React from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

import { useMovies } from "../../context/MovieContext";

export default function ProfileScreen() {
  const { movies, savedMovieIds } = useMovies();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"  />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>Manage your movie profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ML</Text>
          </View>

          <Text style={styles.name}>Movie Lover</Text>

          <Text style={styles.email}>movielover@example.com</Text>

          <View style={styles.memberBadge}>
            <Text style={styles.memberText}>CINEMA MEMBER</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Statistics</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{savedMovieIds.length}</Text>

            <Text style={styles.statLabel}>Saved Movies</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{movies.length}</Text>

            <Text style={styles.statLabel}>Total Movies</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>Movie Lover</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>movielover@example.com</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Type</Text>
            <Text style={styles.infoValue}>Free Member</Text>
          </View>
        </View>

        <Text style={styles.footer}>CINEMA APP © 2026</Text>
      </ScrollView>
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

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E8E3FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#5935D5",
    fontSize: 32,
    fontWeight: "bold",
  },

  name: {
    color: "#171717",
    fontSize: 22,
    fontWeight: "bold",
  },

  email: {
    color: "#777777",
    fontSize: 14,
    marginTop: 7,
  },

  memberBadge: {
    backgroundColor: "#E8E3FF",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 15,
  },

  memberText: {
    color: "#5935D5",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  sectionTitle: {
    color: "#171717",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 15,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  statNumber: {
    color: "#5935D5",
    fontSize: 30,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#777777",
    fontSize: 12,
    marginTop: 8,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },

  infoLabel: {
    color: "#777777",
    fontSize: 14,
  },

  infoValue: {
    color: "#171717",
    fontSize: 13,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E9E6F0",
  },

  footer: {
    color: "#888888",
    fontSize: 11,
    textAlign: "center",
    marginTop: 35,
    marginBottom: 25,
  },
});
