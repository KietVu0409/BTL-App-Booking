import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

import { findCustomerByPhone } from "../../services/CustomerService.js";

const Footer_Home = ({ customer }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [customerApi, setCustomer] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    if (customer && customer.phone_number) {
      const fetchCustomer = async () => {
        try {
          const foundCustomer = await findCustomerByPhone(customer.phone_number);
          setCustomer(foundCustomer); 
        } catch (error) {
          setCustomer(null); 
          console.error("Customer not found or error occurred", error);
        }
      };
  
      fetchCustomer();
    }
  }, [customer?.phone_number]);

  const handlePress = (screen, icon) => {
    setActiveIcon(icon);
    navigation.navigate(screen, { customer: customerApi });
    setTimeout(() => setActiveIcon(null), 200); // Reset after 200ms
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        onPress={() => handlePress('HomePage', 'home')}
        style={[styles.iconContainer, (activeIcon === 'home' || route.name === 'HomePage') && styles.activeIconContainer]}
      >
        <Image source={require("../../assets/typcn_home-outline.png")} style={[styles.icon, activeIcon === 'home' && styles.activeIcon]} />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handlePress('MyFavorite', 'favorite')}
        style={[styles.iconContainer, (activeIcon === 'favorite' || route.name === 'MyFavorite') && styles.activeIconContainer]}
      >
        <Image source={require("../../assets/mdi_heart-outline.png")} style={[styles.icon, activeIcon === 'favorite' && styles.activeIcon]} />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handlePress('ScreenChat', 'chat')}
        style={[styles.iconContainer, (activeIcon === 'chat' || route.name === 'ScreenChat') && styles.activeIconContainer]}
      >
        <Image source={require("../../assets/support-agent.png")} style={[styles.icon, activeIcon === 'chat' && styles.activeIcon]} />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => handlePress('Account', 'account')}
        style={[styles.iconContainer, (activeIcon === 'account' || route.name === 'Account') && styles.activeIconContainer]}
      >
        <Image source={require("../../assets/codicon_account.png")} style={[styles.icon, activeIcon === 'account' && styles.activeIcon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 60,
    backgroundColor: "#F0F9FF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  activeIcon: {
    tintColor: 'blue',
    transform: [{ scale: 1.2 }],
  },
  activeIconContainer: {
    backgroundColor: '#D0E8FF',
  },
});

export default Footer_Home;