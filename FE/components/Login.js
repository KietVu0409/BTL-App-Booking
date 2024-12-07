import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { loginCustomer } from "../services/CustomerService";

const Login = () => {
  const [phone_number, setPhone] = useState("0974034565");
  const [password, setPassword] = useState("Kiet12345678@");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    const data = { phone_number, password };
    setError(""); 
    try {
      const response = await loginCustomer(data);
  
      if (response && response.token) {
        navigation.navigate("HomePage", { customer: response.customer });
      } else {
        setError(response?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Invalid phone number or password.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/Ellipse 1.png")}
            style={styles.ellipse1}
          />
          <Image
            source={require("../assets/Ellipse 2.png")}
            style={styles.ellipse2}
          />
        </View>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={15} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phone_number}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#888"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              source={require("../assets/logos_google-icon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/logos_facebook.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/skill-icons_twitter.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/Subtract.png")}
          style={styles.bottomRightImage}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF6FF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  ellipse1: {
    // width: 570,
    // height: 495,
    // flexShrink: 0,
  },
  ellipse2: {
    // width: 120,
    // height: 120,
    // flexShrink: 0,
    position: "absolute",
    bottom: -50,
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 360,
    color: "#EBA300",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 334,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "rgba(241, 193, 82, 0.80)",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: 211,
    height: 48,
    backgroundColor: "#EBA300",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 15, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  buttonText: {
    color: "#2c3e50",
    fontSize: 20,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "250",
    marginTop: 5,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "250",
  },
  signUpLink: {
    color: "#EBA300",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "900",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  line: {
    width: 140,
    height: 2,
    backgroundColor: "#E3AF3F",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
  },
  bottomRightImage: {
    width: 120,
    height: 150,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  errorText: {
    color: "red",
    //marginBottom: 10,
    marginTop: 5,
  },
});

export default Login;