import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { getAccommodationsByLocationType } from "../../services/AccommodationService.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../services/FavoriteService.js";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchResults = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { customer } = route.params;
  console.log(customer);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Loại location mặc định
  const locationType = "Island";

  // Lấy danh sách accommodation khi component được render
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const accommodations = await getAccommodationsByLocationType(
          locationType
        );
        setSelectedAccommodations(accommodations);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };

    fetchAccommodations();
  }, []);

  // Lấy danh sách yêu thích của người dùng
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (customer) {
          const favoriteData = await getFavorites(customer.customer_id);
          setFavorites(favoriteData);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [customer]);

  const handleFavoriteToggle = async (accommodationId) => {
    try {
      if (!customer) {
        console.error("Customer not provided");
        return;
      }

      if (
        favorites.some(
          (favorite) =>
            favorite.accommodation &&
            favorite.accommodation.accommodation_id === accommodationId
        )
      ) {
        await removeFavorite(customer.customer_id, accommodationId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (favorite) =>
              favorite.accommodation.accommodation_id !== accommodationId
          )
        );
      } else {
        await addFavorite(customer.customer_id, accommodationId);
        setFavorites((prevFavorites) => [
          ...prevFavorites,
          { accommodation: { accommodation_id: accommodationId } },
        ]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFavorite = (accommodationId) => {
    return favorites.some(
      (favorite) => favorite.accommodation.accommodation_id === accommodationId
    );
  };

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    return numericPrice
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VND");
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back-filled.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
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
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.arrangeFilterContainer}>
        <View style={styles.arrangeFilterItem}>
          <Image source={require("../../assets/pepicons-print_down-up.png")} />
          <Text>Arrange</Text>
        </View>
        <View style={styles.arrangeFilterItem}>
        <Image source={require("../../assets/filter_ne.png")} />
          <Text>Filter</Text>
        </View>
      </View>

      {selectedAccommodations.length > 0 ? (
        <View style={{ marginTop: 0, flex: 1, marginBottom: 0 }}>
          <ScrollView
            style={styles.accommodationsList}
            showsVerticalScrollIndicator={false}
          >
            {selectedAccommodations.map((acc) => (
              <TouchableOpacity
                key={acc.accommodation_id}
                style={styles.accommodationItem}
                onPress={() =>
                  navigation.navigate("AccommodationDetail", {
                    accommodationId: acc.accommodation_id,
                    customer,
                  })
                }
              >
                <Image
                  source={{ uri: acc.image_url }}
                  style={styles.accommodationImage}
                />
                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => handleFavoriteToggle(acc.accommodation_id)}
                >
                  <Icon
                    name={
                      isFavorite(acc.accommodation_id) ? "heart" : "heart-o"
                    }
                    size={24}
                    color={isFavorite(acc.accommodation_id) ? "red" : "gray"}
                  />
                </TouchableOpacity>
                <BlurView style={styles.blurView} tint="dark" intensity={100}>
                  <Text style={styles.accommodationName}>{acc.name}</Text>
                  <Text style={styles.accommodationAddress}>{acc.address}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.accommodationPrice}>
                      {formatPrice(acc.price_per_night)}/
                      <Text style={{ fontSize: 12, fontWeight: 300 }}>
                        1 Day
                      </Text>
                    </Text>
                    <Text style={styles.accommodationPrice}>
                      {" "}
                      {acc.rating}⭐
                    </Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No accommodations found.
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  // buttonContainer: {
  //   flexDirection: "row",
  //   position: "absolute",
  //   top: 170,
  //   left: 20,
  //   zIndex: 1,
  // },
  blurSearch: {
    borderRadius: 35,
    overflow: "hidden",
    width: 300,
    height: 45,
    marginLeft: 45,
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
    height: 0.3,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
    //marginBottom: 20,
  },

  arrangeFilterContainer: {
    flexDirection: "row",
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#000",
  },
  arrangeFilterItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.3,
    borderColor: "#000",
  },
  arrangeFilterItemLast: {
    borderRightWidth: 0,
  },

  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 250,
    paddingHorizontal: 20,
  },
  categoriesText: {
    color: "#000",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryBox: {
    width: 80,
    height: 80,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 40,
    marginTop: 20,
  },
  categoryImage: {
    width: 62,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    top: -20,
  },
  categoryText: {
    color: "#000",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
    //marginTop: 40,
  },
  accommodationsList: {
    marginTop: 15,
  },
  accommodationsHeader: {
    alignItems: "center",
  },
  accommodationsHeaderText: {
    fontStyle: "italic",
    fontSize: 24,
    //lineHeight: 29,
  },
  accommodationItem: {
    position: "relative",
    marginBottom: 10,
    alignItems: "center",
  },
  accommodationImage: {
    width: "80%",
    height: 200,
    borderRadius: 10,
  },
  blurView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    width: "80%",
    justifyContent: "center",
    //alignItems: 'center',
    marginLeft: 40,
  },
  accommodationName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginLeft: 10,
  },
  accommodationPrice: {
    color: "#C6E7FF",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  accommodationAddress: {
    color: "white",
    fontSize: 12,
    fontWeight: "light",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginLeft: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 60,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 15,
    padding: 5,
  },
});

export default SearchResults;
