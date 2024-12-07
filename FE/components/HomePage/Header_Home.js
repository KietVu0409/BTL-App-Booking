import React, {useEffect, useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from '@react-navigation/native';

import { findCustomerByPhone } from "../../services/CustomerService.js";

const Header_Home = ({ customer }) => {
  const navigation = useNavigation();
  const [customerApi, setCustomer] = useState(null);

  useEffect(() => {
    if (customer && customer.phone_number) {
      const fetchCustomer = async () => {
        try {
          const foundCustomer = await findCustomerByPhone(customer.phone_number);
          setCustomer(foundCustomer); 
        } catch (error) {
          setCustomer(null); 
          console.error("Customer not found or error occurred", error);
        }
      };
  
      fetchCustomer();
    }
  }, [customer?.phone_number]);
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Hi, {customer?.name}</Text>
      <Text style={styles.subGreeting}>Explore VIETNAM</Text>
      <View style={styles.locationContainer}>
        <Image
          source={require("../../assets/heroicons_map-pin-16-solid.png")}
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>HCM City</Text>
      </View>
      <View style={styles.buttonContainer}>
        <BlurView intensity={50} tint="dark" style={styles.blurSearch}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/material-symbols_search.png")}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Search for your journey</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={50} tint="dark" style={styles.blurFilter}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("Filter", {customer: customerApi})}
          >
            <Image
              source={require("../../assets/mage_filter.png")}
              style={styles.filterButtonIcon}
            />
          </TouchableOpacity>
        </BlurView>
      </View>
      <Image
        source={require("../../assets/Rectangle 9.png")}
        style={styles.headerImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: 440,
    height: 230,
    flexShrink: 0,
    borderRadius: 50,
    zIndex: -1,
  },
  greeting: {
    position: "absolute",
    top: 50,
    left: 20,
    color: "#FFF",
    textAlign: "center",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "500",
    zIndex: 1,
  },
  subGreeting: {
    position: "absolute",
    top: 80,
    left: 20,
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "400",
    zIndex: 1,
  },
  locationContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  locationText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 170,
    left: 20,
    zIndex: 1,
  },
  blurSearch: {
    borderRadius: 35,
    overflow: "hidden",
    width: 300,
    height: 45,
  },
  blurFilter: {
    borderRadius: 15,
    overflow: "hidden",
    width: 60,
    height: 45,
    marginLeft: 10,
  },
  button: {
    width: 300,
    height: 45,
    flexShrink: 0,
    borderRadius: 35,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    width: 24.662,
    height: 25.055,
    marginRight: 10,
    marginLeft: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  filterButton: {
    width: 60,
    height: 45,
    flexShrink: 0,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default Header_Home;
