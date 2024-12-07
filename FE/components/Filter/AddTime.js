import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTime = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('checkIn');

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (mode === 'checkIn') {
      setCheckInDate(selectedDate);
    } else {
      setCheckOutDate(selectedDate);
    }
  };

  const showDatepicker = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const calculateDays = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleSearch = () => {
    navigation.navigate("Filter", {
      selectedLocation: route.params?.selectedLocation,
      checkInDate: checkInDate ? checkInDate.toLocaleDateString() : null,
      checkOutDate: checkOutDate ? checkOutDate.toLocaleDateString() : null,
      days: calculateDays(),
    });
  };

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
          <Text style={styles.title}>Choose Time</Text>
          <View style={styles.timeContainer}>
            <View style={styles.timeSection}>
              <Text style={styles.timeLabel}>Check-In</Text>
              <Text style={styles.timeValue}>
                {checkInDate ? checkInDate.toLocaleDateString() : "Date/Month"}
              </Text>
            </View>
            
            <View style={styles.timeSection}>
              <Text style={styles.timeLabel}>Check-Out</Text>
              <Text style={styles.timeValue}>
                {checkOutDate ? checkOutDate.toLocaleDateString() : "Date/Month"}
              </Text>
            </View>
            
            <View style={styles.timeSection}>
              <Text style={styles.timeLabel}>Days</Text>
              <Text style={styles.timeValue}>
                {calculateDays()}
              </Text>
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={mode === 'checkIn' ? (checkInDate || new Date()) : (checkOutDate || new Date())}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <View style={{flexDirection:"row", justifyContent:"space-between", marginLeft:15}}>
          <TouchableOpacity onPress={() => showDatepicker('checkIn')} style={styles.datePickerButton}>
              <Text style={styles.datePickerButtonText}>Select Check-In</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatepicker('checkOut')} style={styles.datePickerButton}>
              <Text style={styles.datePickerButtonText}>Select Check-Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
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
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  timeSection: {
    width: "30%",
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#338FB9",
    marginTop: 10,
  },
  datePickerButton: {
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },
  datePickerButtonText: {
    color: "#000",
    fontSize: 14,
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

export default AddTime;