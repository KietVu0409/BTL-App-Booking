import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const Filter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { customer } = route.params;
  const selectedLocation = route.params?.selectedLocation;
  const checkInDate = route.params?.checkInDate;
  const checkOutDate = route.params?.checkOutDate;
  const days = route.params?.days;
  const rooms = route.params?.rooms;
  const adults = route.params?.adults;
  const children = route.params?.children;
  const rating = route.params?.rating;
  const minPrice = route.params?.minPrice;
  const maxPrice = route.params?.maxPrice;
  const amenities = route.params?.amenities;

  console.log("customer: ", customer);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                navigation.navigate("AddLocation", {
                  checkInDate,
                  checkOutDate,
                  days,
                })
              }
            >
              <Image
                source={require("../../assets/map_Filter.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>
                {selectedLocation ? selectedLocation : "Add location"}
              </Text>
              <Image
                source={require("../../assets/down-rounded.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                navigation.navigate("AddTime", {
                  selectedLocation,
                })
              }
            >
              <Image
                source={require("../../assets/celer_Filter.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>
                {checkInDate && checkOutDate
                  ? `${checkInDate} - ${checkOutDate} (${days} days)`
                  : "Add time"}
              </Text>
              <Image
                source={require("../../assets/down-rounded.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                navigation.navigate("AddGuests", {
                  checkInDate,
                  checkOutDate,
                  days,
                  selectedLocation,
                })
              }
            >
              <Image
                source={require("../../assets/actor_Filter.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>
                {rooms && adults && children
                  ? `${rooms} Room(s), ${adults} Adult(s), ${children} Children`
                  : "Add guests"}
              </Text>
              <Image
                source={require("../../assets/down-rounded.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                navigation.navigate("AddRating", {
                  checkInDate,
                  checkOutDate,
                  days,
                  selectedLocation,
                  rooms,
                  adults,
                  children,
                })
              }
            >
              <Image
                source={require("../../assets/Star_Filter.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>
                {rating ? `Rating: ${rating} stars` : "Rating Score"}
              </Text>
              <Image
                source={require("../../assets/down-rounded.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                navigation.navigate("PriceRange", {
                  checkInDate,
                  checkOutDate,
                  days,
                  selectedLocation,
                  rooms,
                  adults,
                  children,
                  rating,
                })
              }
            >
              <Image
                source={require("../../assets/Price_Filter.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>
                {minPrice !== undefined && maxPrice !== undefined
                  ? `Price: ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} VND`
                  : "Price Range"}
              </Text>
              <Image
                source={require("../../assets/down-rounded.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() =>
                navigation.navigate("Amenities", {
                  checkInDate,
                  checkOutDate,
                  days,
                  selectedLocation,
                  rooms,
                  adults,
                  children,
                  rating,
                  minPrice,
                  maxPrice,
                })
              }
            >
              <Image
                source={require("../../assets/Amne_Filter.png")}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>
                {amenities && amenities.length > 0
                  ? `Amenities: ${truncateText(amenities.join(", "), 30)}`
                  : "Amenities"}
              </Text>
              <Image
                source={require("../../assets/down-rounded.png")}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} 
            onPress={ () => navigation.navigate('SearchResults', {customer: customer})}
          >
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
    height: 2,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
  },
  box: {
    width: 380,
    height: 550,
    borderRadius: 30,
    backgroundColor: "#FFF",
    marginTop: 20,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  smallButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 329,
    height: 55,
    borderRadius: 20,
    backgroundColor: "#B7E0FF",
    paddingHorizontal: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
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

export default Filter;
