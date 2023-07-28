import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { LocationObject } from 'expo-location';
import { Map, Marker } from 'pigeon-maps';
import { Divider, Searchbar } from 'react-native-paper';


export default function TabOneScreen() {

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>("");
  // const [center, setCenter] = useState([50.879, 4.6997])
  const [center, setCenter] = useState([26.574940, -80.075560]);
  const [zoom, setZoom] = useState(11);
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      // setCenter([location.coords.latitude, location.coords.longitude]);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>

      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{margin: "24px", width: "90%"}}
    />
      <Map 
      // height={300}
      defaultCenter={[26.574940, -80.075560]}
      defaultZoom={11}
      center={center} 
      zoom={zoom} 
      onBoundsChanged={({ center, zoom }) => { 
        setCenter(center) 
        setZoom(zoom) 
      }}>
      <Marker 
      width={50}
      anchor={[26.574940, -80.075560]}
      color={color} 
      onClick={() => setHue(hue + 20)} 
    />
    </Map>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
