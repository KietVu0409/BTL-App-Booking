import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GetStarted from "./components/GetStarted";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage/HomePage";
import Category_Detail from "./components/Category_Detail";
import MyFavorite from "./components/MyFavorite";
import Account from "./components/Account ";
import AccommodationDetail from "./components/Accomodation_Detail";
import Book_Hotel from './components/Book_Hotel';
import PaymentSuccessful from './components/PaymentSuccessful';
import Filter from './components/Filter/Filter';
import SearchResults from "./components/Filter/SearchResults";
import AddLocation from './components/Filter/AddLocation';
import AddTime from './components/Filter/AddTime';
import AddGuests from './components/Filter/AddGuests';
import AddRating from './components/Filter/AddRating';
import PriceRange from './components/Filter/PriceRange';
import Amenities from './components/Filter/Amenities';
import BookingHistory from "./components/BookingHistory";
import PaymentMethod from "./components/PaymentMethod";
import ScreenChat from "./components/ChatBot/ScreenChat";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryDetail"
          component={Category_Detail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyFavorite"
          component={MyFavorite}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccommodationDetail"
          component={AccommodationDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Book_Hotel" 
          component={Book_Hotel} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PaymentSuccessful" 
          component={PaymentSuccessful} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Filter" 
          component={Filter} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddLocation" 
          component={AddLocation} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddTime" 
          component={AddTime} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddGuests" 
          component={AddGuests} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddRating" 
          component={AddRating} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PriceRange" 
          component={PriceRange} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Amenities" 
          component={Amenities} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SearchResults" 
          component={SearchResults} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BookingHistory" 
          component={BookingHistory} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PaymentMethod" 
          component={PaymentMethod} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ScreenChat" 
          component={ScreenChat} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
