import 'react-native-get-random-values';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import CustomButton from '../../../components/Buttons/CustomButton';
import { SVGIcons } from '../../../config/constants/svg';
import { locationScreenStyles } from '../../../styles/locationScreenStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';
import { googlePlacesApi } from '../../../config/constants/constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SIZES } from '../../../config/themes/theme';

const LocationPickerScreen: React.FC<UserNavigationRootProps<"LocationScreen">> = (props) => {

    const mapViewRef = useRef(null);

    const [region, setRegion] = useState<any>({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [address, setAddress] = useState("");
    const { accountCreation }: any = useSelector((state: any) => state?.accountCreation)
    const dispatch = useDispatch()
    const handleConfirmLocation = () => {
        let location = {
            latitude: region.latitude,
            longitude: region.longitude,
            address: address
        }
        const newLocation = [...accountCreation.location, location];
        const updateLocationData = {
            ...accountCreation,
            location: newLocation
        }

        dispatch(setAccountCreation(updateLocationData))
        props.navigation.navigate('LocationsAndPreferences');
    };



    const handleMapReady = () => {
        if (region && mapViewRef.current) {
            let newValue: any = mapViewRef?.current
            newValue.animateToRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    };
    return (
        <SafeAreaView style={locationScreenStyles.container}>
            <View style={locationScreenStyles.mapContainer}>
                <View style={locationScreenStyles.searchBar}>
                    <View style={locationScreenStyles.locationTextContainer}>
                        <View style={{
                            position: 'absolute',
                            top: 10,
                            left: 0,
                            bottom: 0,
                            zIndex: 2
                        }}>
                            <SVGIcons.locationIcon />
                        </View>
                        <GooglePlacesAutocomplete
                            placeholder="Search Location"
                            fetchDetails={true}
                            onPress={(data, details = null) => {
                                if (!details) {
                                    console.warn("No details fetched for this place!", data);
                                    return;
                                }
                                try {
                                    const { lat, lng } = details.geometry.location;
                                    setRegion({ latitude: lat, longitude: lng });
                                    setAddress(details.formatted_address);
                                    console.log('Address:', details.formatted_address);
                                    console.log('Lat:', lat, 'Lng:', lng);
                                } catch (error) {
                                    console.log("Error extracting lat/lng:", error);
                                }
                            }}
                            query={{
                                key: "AIzaSyDK6xDsgrab0VzbnLeEVT1rJHsz2k1mA1c",
                                language: 'en',
                            }}
                            textInputProps={{
                                onFocus: () => console.log('Focused'),
                                onChangeText: text => console.log('Typing:', text),
                            }}
                            predefinedPlaces={[]}
                            styles={{
                                textInput: locationScreenStyles.searchText,
                                textInputContainer: {
                                    height: SIZES.hp(6.1),
                                    paddingHorizontal: 20,
                                    borderRadius: 8,
                                }
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bottom: 0,
                        zIndex: 2
                    }}>
                        <SVGIcons.crossIcon />
                    </TouchableOpacity>
                </View>
                <MapView
                    // provider={PROVIDER_GOOGLE}
                    ref={mapViewRef}
                    style={locationScreenStyles.map}
                    region={region}
                    loadingEnabled
                    // onRegionChangeComplete={handleRegionChange}
                    zoomControlEnabled
                    onMapReady={handleMapReady}
                >
                    <Marker coordinate={region} />
                </MapView>
                <View style={locationScreenStyles.bottom}>
                    <CustomButton
                        onPress={handleConfirmLocation}
                        title='Confirm Location'
                        style={{ width: "100%" }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LocationPickerScreen;



// import 'react-native-get-random-values';
// import React, { useRef } from 'react';
// import { StyleSheet, View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// export default function App() {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const homePlace = {
//     description: 'Home',
//     geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
//   };
//   const workPlace = {
//     description: 'Work',
//     geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       {/* <GooglePlacesAutocomplete
//         placeholder="Search"
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           // handle selection
//         }}
//         query={{
//           key: "AIzaSyDK6xDsgrab0VzbnLeEVT1rJHsz2k1mA1c",
//           language: 'en',
//         }}
//         textInputProps={{
//           onFocus: () => console.log('Focused'),
//           onChangeText: text => console.log('Typing:', text),
//         }}
//       /> */}
//       <GooglePlacesAutocomplete
//         placeholder="Search for a location"
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           const location = details.geometry.location;
//           const region = {
//             latitude: location.lat,
//             longitude: location.lng,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           };
//           mapRef.current.animateToRegion(region, 1000);
//           markerRef.current.setNativeProps({
//             coordinate: {
//               latitude: location.lat,
//               longitude: location.lng,
//             },
//           });
//         }}
//         query={{
//           key: "AIzaSyDK6xDsgrab0VzbnLeEVT1rJHsz2k1mA1c",
//           language: 'en',
//         }}
//         textInputProps={{
//           onFocus: () => console.log('Focused'),
//           onChangeText: text => console.log('Typing:', text),
//         }}
//         predefinedPlaces={[]}
//         styles={{ container: { position: 'absolute', width: '100%', zIndex: 1 } }}
//       />
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={{
//           latitude: 25.2048,
//           longitude: 55.2708,
//           latitudeDelta: 0.1,
//           longitudeDelta: 0.1,
//         }}
//       >
//         <Marker
//           ref={markerRef}
//           coordinate={{ latitude: 25.2048, longitude: 55.2708 }}
//           title="Marker"
//         />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
// });
