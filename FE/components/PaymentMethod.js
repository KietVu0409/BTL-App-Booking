import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentMethod = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {customer} = route.params; // Safely extract customer from route.params

  const handleSelectMethod = (method) => {
    navigation.navigate('Book_Hotel', { selectedMethod: method, customer: customer });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/back-filled.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Method</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.body}>
        {paymentMethods.map((method, index) => (
          <TouchableOpacity key={index} style={styles.paymentButton} onPress={() => handleSelectMethod(method)}>
            <Image source={require("../assets/coverphoto.png")} style={styles.paymentIcon} />
            <Text style={styles.paymentText}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const paymentMethods = [
  "MOMO",
  "Zalo Pay",
  "Bank Card",
  "Visa Card",
  "Napass Card",
  "Cash Payment"
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  body: {
    padding: 10,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 18,
    color: '#000',
  },
});

export default PaymentMethod;