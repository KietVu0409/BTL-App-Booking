import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { getAccommodationsByCamping } from "../../../services/AccommodationService";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../../services/FavoriteService";

const CampingList = ({ customer }) => {
  const navigation = useNavigation();

  const [accommodations, setAccommodations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handlePress = (accommodationId) => {
    navigation.navigate("AccommodationDetail", { accommodationId, customer });
  };

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAccommodationsByCamping();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations: ", error);
      }
    };
    const fetchFavorites = async () => {
      try {
        if (customer) {
          const favoriteData = await getFavorites(customer.customer_id); // Lấy danh sách yêu thích từ server
          setFavorites(favoriteData);
        }
      } catch (error) {
        console.error("Error fetching favorites: ", error);
      }
    };

    fetchAccommodations();
    fetchFavorites();
  }, [customer]);

  // Thêm hoặc xóa accommodation khỏi danh sách yêu thích
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
        // Nếu accommodation đã có trong danh sách yêu thích, xóa
        await removeFavorite(customer.customer_id, accommodationId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (favorite) =>
              favorite.accommodation.accommodation_id !== accommodationId
          )
        );
      } else {
        // Nếu chưa có trong danh sách yêu thích, thêm
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

  // Kiểm tra xem accommodation đã có trong danh sách yêu thích chưa
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
    <View style={styles.container}>
      <Text style={styles.title}>Camping</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {accommodations.map((accommodation) => (
          <TouchableOpacity
            key={accommodation.accommodation_id}
            style={styles.card}
            onPress={() => handlePress(accommodation.accommodation_id)}
          >
            <Image
              source={{ uri: accommodation.image_url }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() =>
                handleFavoriteToggle(accommodation.accommodation_id)
              }
            >
              <Icon
                name={
                  isFavorite(accommodation.accommodation_id)
                    ? "heart"
                    : "heart-o"
                }
                size={20}
                color={
                  isFavorite(accommodation.accommodation_id) ? "red" : "gray"
                }
              />
            </TouchableOpacity>
            <Text style={styles.name}>{accommodation.name}</Text>
            <Text style={{ fontSize: 12 }}>{accommodation.address}</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 12, marginTop: 5, marginRight: 5 }}>
                Rating:{" "}
                <Text style={{ fontWeight: 500, fontSize: 16 }}>
                  {accommodation.rating}⭐
                </Text>
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  marginTop: 5,
                  fontWeight: "bold",
                  color: "#1F509A",
                }}
              >
                {formatPrice(accommodation.price_per_night)}/{" "}
                <Text style={{ fontSize: 12, fontWeight: 400 }}>1 Day</Text>
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15, paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  card: {
    width: 180,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: { width: "100%", height: 120, borderRadius: 10 },
  name: { fontWeight: "bold", marginTop: 5 },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 15,
    padding: 5,
  },
});

export default CampingList;
