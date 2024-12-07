import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { getAccommodationById } from "../services/AccommodationService";

const AccommodationDetail = ({ route }) => {
  const { accommodationId, customer } = route.params;
  const [accommodation, setAccommodation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const navigation = useNavigation();

  const MAX_LENGTH = 100;
  const now = new Date();
  const currentDate = new Date(now.setHours(12, 0, 0, 0));

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

  const hotel = {
    comments: {
      "Phuong Thao": "Absolutely loved the panoramic mountain views!",
      "Manh Hung": "The staff was very attentive and friendly.",
      "Nguyen An": "The room was clean and comfortable.",
      "Tran Binh": "Great location, close to many attractions.",
      "Le Minh": "Breakfast was delicious with a variety of options.",
    },
  };

  //Image Room
  
  const ImageRoom = [
    require("../assets/Room1.jpg"),
    require("../assets/Room2.jpg"),
    require("../assets/Room3.jpg"),
    require("../assets/Room4.jpg"),
  ];

  const handleScroll = (event) => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  const calculateDiscountAmount = (price, discountPercentage) => {
    return (price * discountPercentage) / 100;
  };

  const description = showFullDescription
    ? accommodation.description
    : `${accommodation.description.slice(0, MAX_LENGTH)}...`;

  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  const formattedStart = currentDate.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
  const formattedEnd = nextDay.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: accommodation.image_url }}
            style={styles.hotelImage}
          />
          <View style={styles.buttonWrapperLeft}>
            <BlurView tint="dark" intensity={50} style={styles.blurButton}>
              <TouchableOpacity
                style={styles.circularButton}
                onPress={() => navigation.goBack()}
              >
                <Image source={require("../assets/weui_back-filled.png")} />
              </TouchableOpacity>
            </BlurView>
          </View>
          <View style={styles.buttonWrapperRight}>
            <BlurView tint="dark" intensity={50} style={styles.blurButton}>
              <TouchableOpacity style={styles.circularButton}>
                <Image
                  source={require("../assets/iconoir_heart.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.hotelName}>{accommodation.name}</Text>
          <View style={styles.locationContainer}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/bx_map.png")}
                style={styles.locationIcon}
              />
              <Text style={styles.hotelLocation}>{accommodation.address}</Text>
            </View>

            <TouchableOpacity>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <Text style={{ color: "#F86D0A" }}>View map</Text>
                <Image source={require("../assets/weui_arrow-filled.png")} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../assets/eva_star-fill.png")}
              style={styles.ratingIcon}
            />
            <Text style={styles.hotelRating}>{accommodation.rating}</Text>
            <Text style={{ color: "#666" }}>(86)</Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />
        {accommodation.promotions && accommodation.promotions.length > 0 && (
          <>
            {accommodation.promotions.map((promo) => {
              // Tính số tiền giảm
              const discountAmount = calculateDiscountAmount(
                accommodation.price_per_night,
                promo.discount_percentage
              );

              return (
                <View key={promo.promotion_id} style={styles.promotion}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Image source={require("../assets/tdesign_discount.png")} />
                    <Text style={styles.hotelVoucher}>
                      {promo.discount_percentage}% off, maximum{" "}
                      {discountAmount.toLocaleString()} VNĐ
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        )}

        <View style={styles.horizontalLine} />

        <View style={styles.containerAmenities}>
          <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
            Hotel Amenities
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.amenitiesContainer}
          >
            {accommodation.amenities.map((amenity) => (
              <View key={amenity.amenity_id} style={styles.amenityContainer}>
                {/* Hiển thị hình ảnh */}
                <Image
                  source={{ uri: amenity.image_url }}
                  style={styles.amenityImage}
                  resizeMode="contain"
                />
                {/* Hiển thị tên tiện nghi */}
                <Text style={styles.amenityName}>{amenity.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.horizontalLine} />

        <View style={styles.containerAmenities}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Overview</Text>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#666" }}>
            Welcome to {accommodation.name}!
          </Text>
          <View
            style={{
              marginBottom: 5,
              backgroundColor: "white",
              padding: 5,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "#666",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {description}
              {!showFullDescription &&
                accommodation.description.length > MAX_LENGTH && (
                  <TouchableOpacity
                    onPress={() => setShowFullDescription(true)}
                  >
                    <Text style={styles.readMore}> Read more</Text>
                  </TouchableOpacity>
                )}
              {showFullDescription && (
                <TouchableOpacity onPress={() => setShowFullDescription(false)}>
                  <Text style={styles.readMore}> Show less</Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.showImagesButton}
            onPress={() => setShowImages(!showImages)}
          >
            <Text style={styles.showImagesButtonText}>
              {showImages ? "Hide Images" : "Show Images"}
            </Text>
          </TouchableOpacity>

          {showImages && (
            <View style={styles.flatListContainer}>
              <FlatList
                data={ImageRoom}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
                renderItem={({ item }) => (
                  <Image source={item} style={styles.flatListImage} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        <View style={styles.horizontalLine} />

        <View style={[styles.containerAmenities, { marginBottom: 5 }]}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Reviews</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/noto_star.png")} />
            <Image source={require("../assets/mingcute_star-half-fill.png")} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginLeft: 5,
                color: "#F86D0A",
              }}
            >
              {accommodation.rating}
            </Text>
            <Text style={{ color: "#666" }}>(86 Reviews)</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {Object.entries(hotel.comments).map(
                ([author, comment], index) => (
                  <View key={index} style={styles.commentBox}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={require("../assets/avatarComment.png")}
                        />
                        <View style={{ marginLeft: 5 }}>
                          <Text style={styles.commentAuthor}>{author}</Text>
                          <Text style={{ fontSize: 12 }}>20/11/2024</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Image source={require("../assets/noto_star.png")} />
                        <Image source={require("../assets/noto_star.png")} />
                        <Image source={require("../assets/noto_star.png")} />
                        <Image source={require("../assets/noto_star.png")} />
                        <Image
                          source={require("../assets/mingcute_star-half-fill.png")}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.commentText,
                          { flex: 1, flexShrink: 1, marginRight: 10 },
                        ]}
                      >
                        {comment}
                      </Text>

                      <TouchableOpacity>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/mdi_like.png")}
                            style={{ marginRight: 2 }}
                          />
                          <Text>15</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.horizontalLine} />

        <View style={[styles.containerAmenities, { marginRight: 10 }]}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Hotel Policies</Text>
          <Text style={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
            Check-In and Check-Out Times
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Hourly Booking
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              06:00 to 22:00 (on the same day)
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Overnight Booking
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              22:00 to 12:00 (the next day)
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              Daily Booking
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
              14:00 to 12:00 (the following day)
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: "#E0E0E0",
              marginBottom: 5,
              marginTop: 5,
            }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#666" }}>
              Cancellation Policy
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
              Daily Booking:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                Cancel at least 1 hour before check-in.
              </Text>
            </Text>

            <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
              Overnight Booking:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                Cancel at least 2 hours before check-in time.
              </Text>
            </Text>

            <Text style={{ fontSize: 15, fontWeight: "500", color: "#666" }}>
              Daily Booking:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                Cancel at least 12 hours before check-in.
              </Text>
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#666",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Note:{" "}
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#666" }}>
                If canceled after the specified time, the full booking amount
                will be non-refundable.
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.timeContainer}>
          <Text>
            {" "}
            <Image source={require("../assets/mdi_weather-night.png")} />
            {" 01 Day | "} {formattedStart} - {formattedEnd}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.priceContainer}>
            <Text>
              {" "}
              Original Price:
              <Text style={styles.originalPrice}>
                {" "}
                {formatPrice(accommodation.price_per_night)}
              </Text>
            </Text>

            <Text style={styles.nowPrice}>
              Now:{" "}
              {(
                accommodation.price_per_night -
                accommodation.price_per_night *
                  (accommodation.promotions[0].discount_percentage / 100)
              ).toLocaleString("vi-VN")}{" "}
              VND
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              navigation.navigate("Book_Hotel", {
                accommodationId: accommodationId,
                customer: customer,
                price:
                  accommodation.price_per_night -
                  accommodation.price_per_night *
                    (accommodation.promotions[0].discount_percentage / 100),
              })
            }
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  imageContainer: {
    position: "relative",
  },
  hotelImage: {
    width: 412,
    height: 371,
  },
  imageIndexContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 5,
  },
  imageIndexText: {
    color: "#fff",
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: "#000",
    marginLeft: 2,
  },
  hotelLocation: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginLeft: 3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    //marginBottom: 10,
  },
  ratingIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  hotelRating: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  horizontalLine: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    marginBottom: 5,
    marginTop: 5,
  },
  hotelVoucher: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 10,
  },
  containerAmenities: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  facilityContainer: {
    alignItems: "center",
  },

  commentBox: {
    width: 300,
    height: 100,
    borderRadius: 20,
    border: 0.5,
    borderColor: "#666",
    backgroundColor: "#FFF",
    padding: 10,
    marginRight: 10,
  },
  commentAuthor: {
    fontWeight: "bold",
    //marginBottom: 5,
  },
  commentText: {
    color: "#000",
    fontSize: 15,
  },

  footer: {
    width: "100%",
    height: 135,
    backgroundColor: "#FFF",
    padding: 10,
  },
  timeContainer: {
    width: 390,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#EDE7F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-between",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    fontSize: 15,
    fontWeight: "400",
    color: "#666",
  },
  nowPrice: {
    marginLeft: 3,
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#FB773C",
  },
  bookButton: {
    width: 145,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#F2873B",
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  buttonWrapperLeft: {
    position: "absolute",
    top: 40,
    left: 15,
  },
  buttonWrapperRight: {
    position: "absolute",
    top: 40,
    right: 15,
  },
  blurButton: {
    borderRadius: 30,
    overflow: "hidden",
  },
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  amenitiesContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  amenityContainer: {
    alignItems: "center",
    marginHorizontal: 15,
    //backgroundColor: 'white',
    borderRadius: 10,
    //padding: 5
  },
  amenityImage: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  amenityName: {
    fontSize: 14,
    textAlign: "center",
  },
  readMore: {
    color: "#F86D0A",
    marginLeft: 5,
  },

  showImagesButton: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#F2873B',
  },
  showImagesButtonText: {
    color: '#F2873B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  flatListContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 5,
    //marginTop: 10,
    borderRadius: 10,
  },
  flatListImage: {
    width: 382,
    height: 371,
    borderRadius: 10,
  },
});

export default AccommodationDetail;
