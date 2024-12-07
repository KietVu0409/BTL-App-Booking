import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAccommodationById } from "../services/AccommodationService";

const PaymentSuccessful = ({ route }) => {
  const navigation = useNavigation();
  const { accommodationId, customer, booking, value } = route.params;
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const data = await getAccommodationById(accommodationId);
        setAccommodation(data);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  if (!accommodation) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log(accommodation);
  const formatPrice = (price) => {
    return Number(price)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VND");
  };

  // Lấy thời gian hiện tại và format theo HH:mm
  const getTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Lấy ngày hiện tại và format theo dd-MM-yyyy
  const getDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const time = getTime();
  const date = getDate();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/Khung3.png")} style={styles.image} />
        <Image
          source={require("../assets/tick11.png")}
          style={styles.overlayImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Payment Successful</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Payment ID</Text>
            <Text style={styles.value}>{booking.booking_id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>{formatPrice(booking.total_price)}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("HomePage", {
                  customer: customer,
                })
              }
            >
              <Image source={require("../assets/home-button.png")} />
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("BookingHistory", {
                  customer: customer,
                  bookings: [{
                    ...booking,
                    time: time,
                    date: date,
                    formattedPrice: formatPrice(booking.total_price),
                  }],
                })
              }
            >
              <Image source={require("../assets/mi_share.png")} />
              <Text style={styles.buttonText}>My Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFAFAF",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 10,
    shadowRadius: 50,
    elevation: 30,
    borderRadius: 20,
    position: "relative",
  },
  image: {
    width: 380,
    height: 433,
    borderRadius: 20,
  },
  overlayImage: {
    position: "absolute",
    top: -50,
    left: "35%",
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  textContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 35,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
    marginLeft: 20,
  },
  value: {
    fontSize: 20,
    fontWeight: "400",
    color: "#666",
    marginRight: 20,
  },
  button: {
    flexDirection: "row",
    width: 165,
    height: 43,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#EE8395",
    backgroundColor: "#F2E9EA",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EE8395",
  },
});

export default PaymentSuccessful;