import {Location} from "expo-location";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
const { width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const {granted} = await Location.requestPermissionsAsync();
    if (!granted) {
      setOk(false);
      }
      const {
        coords: {latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps:  false }
      );
      console.log(location)
      setCity(location[0].city);
    };
    useEffect(() => {
      ask();
    },[]);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerstyle={styles.weather}
        >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descripstion}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descripstion}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descripstion}>Sunny</Text>
        </View>        
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descripstion}>Sunny</Text>
        </View>
      </ScrollView> 
    </View>
  );
}

// flex direcxtion의 기본값은 row인데 모바일에서는 column이다.

const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor: "tomato",
  },
  city:{
    flex: 0.8,
    justifyContent: "center",
    alignItems : "center",
  },
  cityName:{
    fontSize: 60,
    fontWeight : "550",
  },
  weather : {
    flex: 3,
  },
  day:{
    width: SCREEN_WIDTH,
    alignItems:"center",
    backgroundColor: "teal",
  },
  temp:{
    marginTop: 20,
    fontSize: 158,
  },
  descripstion:{
    marginTop: -30,
    fontSize:60,
  },
});