import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { findBookingByCustomerId } from "../services/BookingService";

const BookingHistory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { customer, bookings: initialBookings } = route.params;

  const [bookings, setBookings] = useState(initialBookings || []);
  console.log("bookings: ", bookings);

  useEffect(() => {
    if (!initialBookings) {
      const fetchBookings = async () => {
        try {
          const data = await findBookingByCustomerId(customer.customer_id);
          const updatedBookings = data.map(booking => ({
            ...booking,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            date: new Date().toLocaleDateString(),
            formattedPrice: Number(booking.total_price)
              .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
              .replace("₫", "VND"),
          }));
          setBookings(updatedBookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
  
      fetchBookings();
    } else {
      const updatedBookings = initialBookings.map(booking => ({
        ...booking,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        date: new Date().toLocaleDateString(),
        formattedPrice: booking.formattedPrice || Number(booking.total_price)
          .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
          .replace("₫", "VND"),
      }));
      setBookings(updatedBookings);
    }
  }, [customer, initialBookings]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={ () => navigation.navigate('HomePage', {customer: customer})}>
           <Image
            source={require('../assets/back-filled.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Booking</Text>
      </View>

      <View style={styles.divider} />
      <ScrollView style={styles.scrollView}>
        {bookings.map((booking) => (
          <View key={booking.booking_id} style={styles.bookingItem}>
            <Image
              source={{ uri: booking.accommodation.image_url }}
              style={styles.accommodationImage}
            />
            <View style={styles.bookingDetails}>
              <Text style={styles.accommodationName}>{booking.accommodation.name}</Text>
              <Text style={styles.accommodationAddress}>{booking.accommodation.address}</Text>
              <Text style={styles.bookingDate}>Booked on: {booking.date} at {booking.time}</Text>
              <Text style={styles.bookingPrice}>Amount: {booking.formattedPrice}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('AccommodationDetail', { accommodationId: booking.accommodation.accommodation_id })}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  backIcon: {
    marginLeft: 10,
  },
  headerText: {
    color: '#000',
    textAlign: 'center',
    marginLeft: 100,
    fontSize: 24,
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  bookingItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  accommodationImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  accommodationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    //marginVertical: 5,
  },
  bookingPrice: {
    fontSize: 14,
    color: '#666',
    //marginVertical: 5,
  },
  accommodationAddress: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF7F3E',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingHistory;