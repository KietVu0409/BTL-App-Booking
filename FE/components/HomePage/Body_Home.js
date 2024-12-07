import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { getAllLocationTypes } from "../../services/LocationTypeService.js"; 
import { getAllLocations } from "../../services/LocationService.js";
import { findCustomerByPhone } from "../../services/CustomerService.js";
import { useNavigation } from '@react-navigation/native';

import HotelList from "./Body_Child/HotelList.js";
import ResortList from "./Body_Child/ResortList.js";
import CampingList from "./Body_Child/CampingList.js";
import HomestayList from "./Body_Child/HomestayList.js";

const Body_Home = ({ customer }) => {

  const [locationTypes, setLocationTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  const [customerApi, setCustomer] = useState(null);

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

  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const data = await getAllLocationTypes();
        setLocationTypes(data);
      } catch (error) {
        console.error("Error fetching location types:", error);
      }
    };

    fetchLocationTypes();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationTypePress = async (locationType) => {
    navigation.navigate('CategoryDetail', { locationType: locationType, customer: customerApi });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesText}>Categories</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesGrid}
        >
          {locationTypes.map((type) => (
            <TouchableOpacity key={type.location_type_id} 
              style={styles.categoryBox}
              onPress={() => handleLocationTypePress(type.type)}
            >
              <Image
                source={{ uri: type.image_url }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{type.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Các địa điểm ở Việt Nam */}
      <View style={[styles.categoriesContainer, { marginTop: 20 }]}>
        <Text style={styles.categoriesText}>Explore Vietnam</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialOffersGrid}
        >
          {locations.map((location) => (
            <TouchableOpacity key={location.location_id} style={styles.locationCard}>
              <Image
                source={{ uri: location.image_url }}
                style={styles.locationImage}
              />
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationCount}>{location.accommodations_count} chỗ nghỉ</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Các loại chỗ nghỉ */}
      <HotelList customer={customerApi}/>
      <CampingList customer={customerApi}/>
      <ResortList customer={customerApi}/>
      <HomestayList customer={customerApi}/>

      {/* Các địa điểm có khuyến mãi */}
      <View style={[styles.categoriesContainer, { marginTop: 20 }]}>
        <Text style={styles.categoriesText}>Promotions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialOffersGrid}
        >
          <Text>aa</Text>
          {/* Add special offers content here */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 250,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoriesText: {
    color: "#000",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
  },
  seeAllText: {
    color: "#000",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
  },
  categoriesGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryBox: {
    width: 80,
    height: 80,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginRight: 40,
    marginTop: 20,
    //padding: 10,
  },
  categoryImage: {
    width: 62,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    top: -20,
  },
  categoryText: {
    color: "#000",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
    marginTop: 40,
  },
  specialOffersGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  countdownText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "400",
    marginLeft: 10,
    marginTop: 10,
  },
  accommodationsList: {
    marginTop: 15,
  },
  accommodationsHeader: {
    alignItems: 'center'
  },
  accommodationsHeaderText: {
    fontStyle: 'italic',
    fontSize: 24,
    lineHeight: 29,
  },
  accommodationItem: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  accommodationImage: {
    width: '80%', 
    height: 200, 
    borderRadius: 10,
  },
  accommodationName: {
    position: 'absolute',
    top: 10,
    left: 50,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accommodationPrice: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  accommodationAddress: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  locationCard: {
    width: 180, marginRight: 15, marginTop: 10, borderRadius: 10, backgroundColor: '#fff' 
  },
  locationImage: {
    width: 180,
    height: 150,
    borderRadius: 10,
  },
  locationName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationCount: {
    fontSize: 12,
  },
});

export default Body_Home;
