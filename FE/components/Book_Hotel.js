import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAccommodationById } from "../services/AccommodationService";
import { createBooking } from "../services/BookingService";
import DropDownPicker from "react-native-dropdown-picker";

const Book_Hotel = ({ route }) => {
  const navigation = useNavigation();
  const { accommodationId, customer, price } = route.params;
  const [accommodation, setAccommodation] = useState(null);

  const [selectedMethod, setSelectedMethod] = useState("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] =
    useState("22:00, 11/08/2024");
  const [selectedCheckOutDate, setSelectedCheckOutDate] =
    useState("12:00, 12/08/2024");
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  //===========
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Credit Card", value: "credit_card" },
    { label: "Zalo Pay", value: "zalopay" },
    { label: "Cash", value: "cash" },
  ]);

  // Hàm ánh xạ icon theo value
  const getIcon = (value) => {
    switch (value) {
      case "credit_card":
        return require("../assets/credit_card.png");
      case "zalopay":
        return require("../assets/zalopay.png");
      case "cash":
        return require("../assets/cash.png");
      default:
        return null;
    }
  };

  // Hàm xử lý khi chọn phương thức thanh toán
  const handleSelectPayment = (item) => {
    setValue(item.value); // Cập nhật giá trị được chọn
    setOpen(false); // Đóng Dropdown
    console.log("Selected Payment Method:", item.label); // Log giá trị được chọn
  };

  const calculateDiscountAmount = (price, discountPercentage) => {
    return (price * discountPercentage) / 100;
  };

  const showDatePicker = (type) => {
    setIsCheckIn(type);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  console.log("accommodationId", accommodationId);
  console.log("customer", customer);

  const handleConfirm = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${hours}:${minutes}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    if (isCheckIn) {
      setSelectedCheckInDate(formattedDate);
    } else {
      setSelectedCheckOutDate(formattedDate);
    }
    hideDatePicker();
  };

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
  const formatPrice = (price) => {
    return Number(price)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "VND");
  };

  const calculateHotelNights = (checkInDate, checkOutDate) => {
    // Chuyển chuỗi ngày thành đối tượng Date (chỉ lấy năm, tháng, ngày, bỏ qua giờ)
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Lấy ngày của check-in và check-out (chỉ năm, tháng, ngày)
    const checkInDay = new Date(
      checkIn.getFullYear(),
      checkIn.getMonth(),
      checkIn.getDate()
    );
    const checkOutDay = new Date(
      checkOut.getFullYear(),
      checkOut.getMonth(),
      checkOut.getDate()
    );

    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference > 24) {
      checkOutDay.setDate(checkOutDay.getDate() + 1);
    }

    // Nếu check-out sau 12h trưa, tính thêm một ngày
    if (checkOut.getHours() >= 12) {
      // Đảm bảo nếu check-out sau 12h trưa, thì tính một ngày nữa
      checkOutDay.setDate(checkOutDay.getDate() + 1);
    }

    // Tính số ngày chênh lệch
    const differenceInTime = checkOutDay.getTime() - checkInDay.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  };

  const convertToISOFormat = (dateStr) => {
    // Tách các phần ngày, giờ từ chuỗi "18:01, 6/12/2024"
    const [timeStr, dateStrWithoutTime] = dateStr.split(", ");
    const [day, month, year] = dateStrWithoutTime
      .split("/")
      .map((num) => parseInt(num));

    // Tạo đối tượng Date
    const date = new Date(
      year,
      month - 1,
      day,
      ...timeStr.split(":").map((num) => parseInt(num))
    );

    // Chuyển sang định dạng ISO chuẩn
    return date.toISOString();
  };

  console.log(
    `selectedCheckInDate: ${convertToISOFormat(selectedCheckInDate)}`
  );
  console.log(`selectedCheckOutDate: ${selectedCheckOutDate}`);
  const numberOfNights = calculateHotelNights(
    convertToISOFormat(selectedCheckInDate),
    convertToISOFormat(selectedCheckOutDate)
  );
  console.log("numberOfNights", numberOfNights);

  console.log("accommodationId: ", accommodationId);
  console.log("customer_id: ", customer.customer_id);
  const handleCreateBooking = async () => {
    const bookingData = {
      accommodation_id: Number(accommodationId), // Ensure accommodationId is a number
      customer_id: Number(customer.customer_id), // Ensure customer_id is a number
      check_in_date: convertToISOFormat(selectedCheckInDate),
      check_out_date: convertToISOFormat(selectedCheckOutDate),
      total_price: price * numberOfNights,
    };

    try {
      setIsBooking(true); // Đang tạo booking
      const booking = await createBooking(bookingData); // Gọi hàm createBooking
      console.log("Booking created:", booking);

      // Sau khi tạo booking thành công, điều hướng đến trang PaymentSuccessful
      navigation.navigate("PaymentSuccessful", {
        accommodationId,
        customer,
        booking,
        value,
      });

      setIsBooking(false); // Kết thúc quá trình tạo booking
    } catch (error) {
      console.error("Error creating booking:", error);
      setIsBooking(false);
      Alert.alert(
        "Error",
        "There was an error creating your booking. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back-filled.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm and Pay</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.hotelInfoContainer}>
        <Image
          source={{ uri: accommodation.image_url }}
          style={styles.hotelImage}
        />
        <View style={styles.hotelDetails}>
          <View>
            <Text style={styles.hotelName}>{accommodation.name}</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                maxWidth: "100%",
              }}
            >
              <Image
                source={require("../assets/bx_map.png")}
                style={styles.locationIcon}
              />
              <Text style={styles.hotelLocation}>{accommodation.address}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, marginTop: 8 }}>Price: </Text>
              <Text style={{ fontSize: 24, fontWeight: 700 }}>
                {formatPrice(price)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 50 }}>
              <Image
                source={require("../assets/eva_star-fill.png")}
                style={{ marginTop: 8 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 8,
                  color: "#525252",
                  fontWeight: 700,
                }}
              >
                {accommodation.rating}(75)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View style={styles.timeInfoContainer}>
        <LinearGradient colors={["#F86D0A", "#FFB26F"]} style={styles.timeBox}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/two-hearts_1.png")} />
            <Image source={require("../assets/mdi_timer-check-outline.png")} />
            <Image source={require("../assets/two-hearts_2.png")} />
          </View>
          <Text style={styles.timeText}>01 Night</Text>
        </LinearGradient>
        <View style={styles.timeDetails}>
          <View>
            <Text style={styles.checkIn}>Check-in</Text>
            <Text style={styles.timeInOut}>22:00, 11/08/2024</Text>
          </View>
          <View>
            <Text style={styles.checkOut}>Check-out</Text>
            <Text style={styles.timeInOut}>12:00, 12/08/2024</Text>
          </View>
        </View>
        <TouchableOpacity style={{ marginLeft: 60, marginTop: 10 }}>
          <Image source={require("../assets/bx_edit.png")} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.timeInfoContainer}>
        <LinearGradient colors={["#F86D0A", "#FFB26F"]} style={styles.timeBox}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/two-hearts_1.png")} />
            <Image source={require("../assets/mdi_timer-check-outline.png")} />
            <Image source={require("../assets/two-hearts_2.png")} />
          </View>
          <Text style={styles.timeText}>{numberOfNights} Day</Text>
        </LinearGradient>
        <View style={styles.timeDetails}>
          <View>
            <Text style={styles.checkIn}>Check-in</Text>
            <Text style={styles.timeInOut}>{selectedCheckInDate}</Text>
          </View>
          <View>
            <Text style={styles.checkOut}>Check-out</Text>
            <Text style={styles.timeInOut}>{selectedCheckOutDate}</Text>
          </View>
        </View>
        <View style={styles.timeDetails}>
          <TouchableOpacity
            style={{ marginLeft: 60 }}
            onPress={() => showDatePicker(true)}
          >
            <Image source={require("../assets/bx_edit.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 60 }}
            onPress={() => showDatePicker(false)}
          >
            <Image source={require("../assets/bx_edit.png")} />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.InforGuest}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            Guest Information
          </Text>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: "#F86D0A" }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Name</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
            {customer?.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Phone Number</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
            {customer?.phone_number}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.InforGuest}>
        <View style={styles.VoucherCT1}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/ic_baseline-discount.png")} style={{marginTop: 5}} />
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
                    {/* <Image source={require("../assets/tdesign_discount.png")} /> */}
                    <Text style={{ fontSize: 16, fontWeight: 500 }}>
                      {promo.discount_percentage}% off, maximum{" "}
                      {discountAmount.toLocaleString()} VNĐ
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        )}
          </View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            {/* <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
              Select or enter code
            </Text> */}
            <Image
              source={require("../assets/weui_nguoc.png")}
              style={{ marginLeft: 3, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dividerMini} />

        <View style={styles.VoucherCT1}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/openmoji_coin.png")} style={{marginBottom: 5}}/>
            <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 5 }}>
              Coins
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
              Use coins
            </Text>
            <Image
              source={require("../assets/weui_nguoc.png")}
              style={{ marginLeft: 3, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.PaymentDetails}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            Payment Details
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Room Charges</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
            {formatPrice(accommodation.price_per_night)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Voucher</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, color: "#666" }}>
            - {formatPrice(accommodation.price_per_night * 0.1)}
          </Text>
        </View>

        <View style={styles.dividerMini} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Total Payment</Text>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>
            {formatPrice(price * numberOfNights)}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={{ marginLeft: 10, color: "#666" }}>
        By clicking 'Book Now', you agree to{" "}
        <Text style={{ color: "#3160FA" }}>our terms and conditions</Text>
      </Text>

      <View style={styles.Bottom}>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: "40%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
            // onPress={() => navigation.navigate('PaymentMethod', {customer: customer})}
          >
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/solar_card-bold.png")} />
              <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 3 }}>
                Select Payment Method
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a payment method"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          renderListItem={(props) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectPayment(props.item)}>
              <Image source={getIcon(props.item.value)} style={styles.icon} />
              <Text style={styles.itemText}>{props.item.label}</Text>
            </TouchableOpacity>
          )}
          onChangeValue={(val) => console.log("Selected:", val)}
        />

        <View
          style={{
            width: "95%",
            height: 2,
            backgroundColor: "#E0E0E0",
            marginBottom: 0,
            marginLeft: 10,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#666", fontSize: 16 }}>Amount to Pay</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#F86D0A",
                fontStyle: "italic",
              }}
            >
              {formatPrice(price * numberOfNights)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleCreateBooking}
            disabled={isBooking} // Vô hiệu hóa nút khi đang tạo booking
          >
            <Text style={styles.bookButtonText}>
              {isBooking ? "Booking..." : "Book Now"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
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
    height: 5,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
  },
  dividerMini: {
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
  },
  hotelInfoContainer: {
    flexDirection: "row",
    width: "95%",
    height: 128,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 10,
  },
  hotelImage: {
    width: 143,
    height: 128,
    borderRadius: 10,
  },
  hotelDetails: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  timeInfoContainer: {
    flexDirection: "row",
    width: "95%",
    height: 128,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 10,
  },
  timeBox: {
    width: 143,
    height: 128,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
  },
  timeDetails: {
    marginLeft: 10,
    justifyContent: "space-around",
  },
  checkIn: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  checkOut: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  timeInOut: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
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
    fontWeight: "400",
    color: "#000",
    marginLeft: 3,
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "70%",
  },

  InforGuest: {
    width: "95%",
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  VoucherCT1: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
    alignItems: "center",
  },
  PaymentDetails: {
    width: "95%",
    height: 120,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  Bottom: {
    width: "100%",
    height: 120,
    backgroundColor: "#FFFF",
    position: "absolute",
    bottom: 0,
  },

  bookButton: {
    width: 130,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#F2873B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 7,
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default Book_Hotel;
