import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Footer_Home from "./HomePage/Footer_Home.js";

import { getFavorites, removeFavorite } from "../services/FavoriteService"; // Assume these services are implemented

const MyFavorite = ({ route, navigation }) => {
  const { customer } = route.params;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (customer) {
          const data = await getFavorites(customer.customer_id);
          setFavorites(data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [customer]);

  const handleRemoveFavorite = async (accommodationId) => {
    try {
      await removeFavorite(customer.customer_id, accommodationId);
      setFavorites(
        favorites.filter(
          (fav) => fav.accommodation.accommodation_id !== accommodationId
        )
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/back-filled.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Favorites List</Text>
        </View>

        <View style={styles.divider} />
        <ScrollView contentContainerStyle={styles.favoriteList}>
          {favorites.map((fav) => (
            <View key={fav.accommodation.accommodation_id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AccommodationDetail", {
                    accommodationId: fav.accommodation.accommodation_id,
                    customer: customer,
                  })
                }
                style={styles.favoriteItem}
              >
                <Image
                  source={{ uri: fav.accommodation.image_url }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.name}>{fav.accommodation.name}</Text>
                  <Text style={styles.address}>
                    {fav.accommodation.address}
                  </Text>
                  <Text style={styles.rating}>Rating: {fav.accommodation.rating}⭐</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    handleRemoveFavorite(fav.accommodation.accommodation_id)
                  }
                  style={{marginRight: 10}}
                >
                  <Ionicons name="heart-dislike" size={24} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    //padding: 20,
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
    color: "#000",
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
    marginBottom: 20,
  },
  favoriteList: {
    flexGrow: 1,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#777",
  },
});

export default MyFavorite;
