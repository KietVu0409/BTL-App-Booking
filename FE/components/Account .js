import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { findBookingByCustomerId } from "../services/BookingService";
import { changePassword } from "../services/CustomerService";

const Account = ({ route, navigation }) => {
  const { customer } = route.params;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await findBookingByCustomerId(customer.customer_id);
        const updatedBookings = data.map((booking) => ({
          ...booking,
          time: new Date(booking.booking_date).toLocaleTimeString(),
          date: new Date(booking.booking_date).toLocaleDateString(),
          formattedPrice: Number(booking.total_price)
            .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
            .replace("₫", "VND"),
        }));
        setBookings(updatedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [customer]);

  const handleSubmit = async () => {
    try {
      const response = await changePassword(customer.customer_id, oldPassword, otp, newPassword, confirmPassword);
      alert('Password changed successfully!');
      setShowPasswordForm(false);
    } catch (error) {
      alert('Error changing password: ' + (error.message || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    try {
      navigation.navigate("GetStarted");
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/back-filled.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Account Information</Text>
        </View>

        <Image
          source={require("../assets/coverphoto.png")}
          style={styles.coverPhoto}
        />
        <Image
          source={require("../assets/avatar_acc.png")}
          style={styles.avatar}
        />

        <Text style={styles.labelLeft}>Name: {customer.name}</Text>
        <Text style={styles.labelLeft}>Phone: {customer.phone_number}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>My Page</Text>

        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() =>
            navigation.navigate("BookingHistory", {
              customer: customer,
              bookings: bookings,
            })
          }
        >
          <Image source={require("../assets/Changehistory.png")} />
          <Text style={styles.sectionText}>Booking History</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require("../assets/Changequickreply.png")} />
          <Text style={styles.sectionText}>Quick Booking</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require("../assets/Hottrend.png")} />
          <Text style={styles.sectionText}>Hot Hotel</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Setting</Text>

        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require("../assets/Changelanguage.png")} />
          <Text style={styles.sectionText}>Language</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require("../assets/Changearea.png")} />
          <Text style={styles.sectionText}>Change Area</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require("../assets/Changesettings.png")} />
          <Text style={styles.sectionText}>Setting Notification</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Information</Text>

        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require("../assets/Changeaccount.png")} />
          <Text style={styles.sectionText}>Change Account</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setShowPasswordForm(!showPasswordForm)}
        >
          <Image source={require("../assets/Changepassword-solid.png")} />
          <Text style={styles.sectionText}>
            {showPasswordForm ? "Hide Password Form" : "Change Password"}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        {showPasswordForm && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="OTP"
            secureTextEntry
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
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
    marginLeft: 80,
    fontSize: 24,
    fontWeight: "500",
  },
  coverPhoto: {
    width: "100%",
    height: 150,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: -75,
    borderWidth: 3,
    borderColor: "#fff",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    marginTop: 3,
    marginBottom: 20,
  },
  labelLeft: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  sectionItem: {
    //padding: 15,
    marginHorizontal: 40,
    flexDirection: "row",
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#FECDA6",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#FF5B22",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Account;
