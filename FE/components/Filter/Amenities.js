import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const amenitiesList = [
  "Free Wi-Fi",
  "24-Hour Service",
  "Bathtub",
  "Love Chair",
  "Smart TV",
  "Air Conditioning",
  "Swimming Pool",
  "Netflix",
  "Refrigerator",
  "Car Parking",
  "Hair Dryer",
  "Elevator",
];

const amenityIcons = {
  "Free Wi-Fi": require("../../assets/wifi.png"),
  "24-Hour Service": require("../../assets/24-hours.png"),
  "Bathtub": require("../../assets/bathtub.png"),
  "Love Chair": require("../../assets/ic_round-chair.png"),
  "Smart TV": require("../../assets/tv.png"),
  "Air Conditioning": require("../../assets/air-conditioning.png"),
  "Swimming Pool": require("../../assets/fluent_swimming.png"),
  "Netflix": require("../../assets/netflix.png"),
  "Refrigerator": require("../../assets/ep_refrigerator.png"),
  "Car Parking": require("../../assets/CarParking.png"),
  "Hair Dryer": require("../../assets/hairdryer.png"),
  "Elevator": require("../../assets/fluent_elevator.png"),
};

const Amenities = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenity)
        ? prevSelected.filter((item) => item !== amenity)
        : [...prevSelected, amenity]
    );
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
      rating: route.params?.rating,
      minPrice: route.params?.minPrice,
      maxPrice: route.params?.maxPrice,
      amenities: selectedAmenities,
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
          <Text style={styles.title}>Amenities</Text>
          <Text style={styles.subtitle}>Select Hotel Amenities</Text>

          <FlatList
            data={amenitiesList}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            renderItem={({ item }) => (
              <View style={styles.amenityContainer}>
                <Image
                  source={amenityIcons[item]}
                  style={styles.amenityIcon}
                />
                <Text style={styles.amenityText}>{item}</Text>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleAmenity(item)}
                >
                  {selectedAmenities.includes(item) && (
                    <View style={styles.checkboxSelected} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
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
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 5,
  },
  box: {
    width: 380,
    height: 632,
    borderRadius: 30,
    backgroundColor: "#FFF",
    marginTop: 20,
    alignSelf: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  amenityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  amenityIcon: {
    width: 24,
    height: 24,
  },
  amenityText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    width: 16,
    height: 16,
    backgroundColor: "#338FB9",
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

export default Amenities;