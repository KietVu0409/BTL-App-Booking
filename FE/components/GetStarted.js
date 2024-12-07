import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../assets/weui_back-filled.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/material-symbols_search.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/image_GetStarted.png")}
        style={styles.image}
      />
      <View style={styles.overlay} />
      <Text style={styles.text}>
        DISCOVER{"\n"}
        MEANINGFUL NEW{"\n"}
        JOURNEYS WITH US
      </Text>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.createAccountText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 440,
    height: 956,
    flexShrink: 0,
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 30,
    right: 50,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 15.648,
    height: 30,
    flexShrink: 0,
  },
  searchIcon: {
    width: 31.297,
    height: 30,
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
  },
  text: {
    position: "absolute",
    width: 394,
    color: "#FFF",
    textAlign: "center",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 32,
    top: "42%",
    left: "50%",
    transform: [{ translateX: -197 }, { translateY: -48 }],
  },
  signInButton: {
    position: "absolute",
    width: 258,
    height: 54,
    flexShrink: 0,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    justifyContent: "center",
    alignItems: "center",
    bottom: "40%",
    left: "50%",
    transform: [{ translateX: -129 }],
  },
  signInText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 32,
    marginTop: 7,
  },
  createAccountButton: {
    position: "absolute",
    bottom: "36%",
    left: "61%",
    transform: [{ translateX: -129 }],
  },
  createAccountText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 20,
  },
});

export default GetStarted;
