import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

const PriceRange = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

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
      minPrice,
      maxPrice,
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
          <Text style={styles.title}>Price Range</Text>
          <Text style={styles.subtitle}>Drag to Select Your Price Range</Text>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5000}
            step={1}
            minimumTrackTintColor="#78B3CE"
            maximumTrackTintColor="#C9E6F0"
            thumbTintColor="#338FB9"
            value={minPrice}
            onValueChange={setMinPrice}
          />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5000}
            step={1}
            minimumTrackTintColor="#78B3CE"
            maximumTrackTintColor="#C9E6F0"
            thumbTintColor="#338FB9"
            value={maxPrice}
            onValueChange={setMaxPrice}
          />

          <View style={styles.priceContainer}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Minimum Price</Text>
              <Text style={styles.priceValue}>
                {minPrice.toLocaleString()},000 VND
              </Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Maximum Price</Text>
              <Text style={styles.priceValue}>
                {maxPrice.toLocaleString()},000 VND
              </Text>
            </View>
          </View>
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  slider: {
    width: 300,
    height: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  priceBox: {
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#338FB9",
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

export default PriceRange;
