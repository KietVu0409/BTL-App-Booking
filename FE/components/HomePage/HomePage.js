import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header_Home from "./Header_Home";
import Body_Home from "./Body_Home";
import Footer_Home from "./Footer_Home";

const HomePage = ({ route }) => {

  const { customer } = route.params;

  return (
    <View style={styles.container}>
      <Header_Home customer={customer}/>
      <Body_Home customer={customer}/>
      <Footer_Home customer={customer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
});

export default HomePage;
