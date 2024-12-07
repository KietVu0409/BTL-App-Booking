import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const locations = [
    { name: "Đà Nẵng", country: "Việt Nam", type: "City" },
    { name: "Hà Nội", country: "Việt Nam", type: "City" },
    { name: "Hồ Chí Minh", country: "Việt Nam", type: "City" },
    { name: "Nha Trang", country: "Việt Nam", type: "City" },
    { name: "Huế", country: "Việt Nam", type: "City" },
    { name: "Phú Quốc", country: "Việt Nam", type: "Island" },
    { name: "Hội An", country: "Việt Nam", type: "City" },
    { name: "Cần Thơ", country: "Việt Nam", type: "City" },
    { name: "Vũng Tàu", country: "Việt Nam", type: "City" },
    { name: "Sa Pa", country: "Việt Nam", type: "Town" },
    { name: "Đà Lạt", country: "Việt Nam", type: "City" },
    { name: "Quy Nhơn", country: "Việt Nam", type: "City" },
    { name: "Buôn Ma Thuột", country: "Việt Nam", type: "City" },
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <View style={styles.searchBar}>
            <Image
              source={require("../../assets/searchLocation (1).png")}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          <Text style={styles.title}>Popular Locations</Text>

          <ScrollView vertical showsHorizontalScrollIndicator={false}>
            {filteredLocations.map((location, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.locationItem,
                  selectedLocation === index && { backgroundColor: "#EBF4F6" },
                ]}
                onPress={() => setSelectedLocation(index)}
              >
                <View>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationCountry}>{location.country}</Text>
                </View>
                <View style={styles.locationType}>
                  <Text style={styles.locationTypeText}>{location.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if (selectedLocation !== null) {
              navigation.navigate("Filter", {
                selectedLocation: locations[selectedLocation].name,
                checkInDate: route.params?.checkInDate,
                checkOutDate: route.params?.checkOutDate,
                days: route.params?.days,
              });
            }
          }}
        >
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
  dividerMini: {
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    marginBottom: 15,
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
  searchBar: {
    width: 350,
    height: 41.565,
    borderRadius: 35,
    backgroundColor: "#B7E0FF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "400",
  },
  locationCountry: {
    color: "#666",
    fontSize: 13,
    fontWeight: "400",
  },
  locationType: {
    width: 65,
    height: 22.303,
    borderRadius: 10,
    backgroundColor: "#FBF0E6",
    justifyContent: "center",
    alignItems: "center",
  },
  locationTypeText: {
    fontSize: 12,
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

export default AddLocation;