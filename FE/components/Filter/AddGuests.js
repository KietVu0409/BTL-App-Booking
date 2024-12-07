import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddGuests = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

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
          <Text style={styles.title}>Room & Guests</Text>

          <View style={styles.optionContainer}>
            <Image
              source={require("../../assets/material-symbols_bedroom-child-outline-rounded.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Room</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => decrement(setRooms, rooms)} style={styles.counterButton}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{rooms}</Text>
              <TouchableOpacity onPress={() => increment(setRooms, rooms)} style={styles.counterButton}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Image
              source={require("../../assets/gravity-ui_persons.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Adults</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => decrement(setAdults, adults)} style={styles.counterButton}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{adults}</Text>
              <TouchableOpacity onPress={() => increment(setAdults, adults)} style={styles.counterButton}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Image
              source={require("../../assets/fa6-solid_children.png")}
             
            />
            <Text style={styles.optionText}>Children</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => decrement(setChildren, children)} style={styles.counterButton}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{children}</Text>
              <TouchableOpacity onPress={() => increment(setChildren, children)} style={styles.counterButton}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={() => {
          navigation.navigate("Filter", {
            selectedLocation: route.params?.selectedLocation,
            checkInDate: route.params?.checkInDate,
            checkOutDate: route.params?.checkOutDate,
            days: route.params?.days,
            rooms,
            adults,
            children,
          });
        }}>
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: "500",
  },
  counterValue: {
    marginHorizontal: 10,
    fontSize: 18,
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

export default AddGuests;