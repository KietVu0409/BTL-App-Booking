import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddRating = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleSearch = () => {
    navigation.navigate("Filter", {
      selectedLocation: route.params?.selectedLocation,
      checkInDate: route.params?.checkInDate,
      checkOutDate: route.params?.checkOutDate,
      days: route.params?.days,
      rooms: route.params?.rooms,
      adults: route.params?.adults,
      children: route.params?.children,
      rating: selectedRating,
    });
  };

  return (
    <LinearGradient colors={["#78B3CE", "#C9E6F0"]} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/weui_back-filled.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search Filters</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.box}>
          <Text style={styles.title}>Rating Score</Text>

          <TouchableOpacity
            style={[
              styles.ratingButton,
              selectedRating === 5.0 && styles.selectedRatingButton,
            ]}
            onPress={() => handleRatingSelect(5.0)}
          >
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Image
                source={require("../../assets/eva_star-fill.png")}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingButtonText}>5.0 (Excellent)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ratingButton,
              selectedRating === 4.5 && styles.selectedRatingButton,
            ]}
            onPress={() => handleRatingSelect(4.5)}
          >
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Image
                source={require("../../assets/eva_star-fill.png")}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingButtonText}>≥ 4.5 (Very Good)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ratingButton,
              selectedRating === 4.0 && styles.selectedRatingButton,
            ]}
            onPress={() => handleRatingSelect(4.0)}
          >
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Image
                source={require("../../assets/eva_star-fill.png")}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingButtonText}>≥ 4.0 (Good)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ratingButton,
              selectedRating === 3.5 && styles.selectedRatingButton,
            ]}
            onPress={() => handleRatingSelect(3.5)}
          >
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Image
                source={require("../../assets/eva_star-fill.png")}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingButtonText}>≥ 3.5 (Above Average)</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ratingButton,
              selectedRating === 3.0 && styles.selectedRatingButton,
            ]}
            onPress={() => handleRatingSelect(3.0)}
          >
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Image
                source={require("../../assets/eva_star-fill.png")}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingButtonText}>≥ 3.0 (Average)</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  backIcon: {
    marginLeft: 10,
  },
  headerText: {
    color: "#FFF",
    textAlign: "center",
    marginLeft: 100,
    fontSize: 24,
    fontWeight: "500",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
  },
  box: {
    width: 380,
    height: 632,
    borderRadius: 30,
    backgroundColor: "#FFF",
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  ratingButton: {
    width: 311,
    height: 49,
    borderRadius: 15,
    backgroundColor: "#A5CBE0",
    justifyContent: "center",
    marginBottom: 15,
  },
  selectedRatingButton: {
    backgroundColor: "#A2C579",
  },
  ratingButtonText: {
    fontSize: 20,
    fontWeight: "400",
  },
  searchButton: {
    width: 329,
    height: 61,
    borderRadius: 20,
    backgroundColor: "#338FB9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  searchButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AddRating;
