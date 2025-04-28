import 'react-native-get-random-values';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Platform, PermissionsAndroid, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import CustomButton from '../../../components/Buttons/CustomButton';
import { SVGIcons } from '../../../config/constants/svg';
import { locationScreenStyles } from '../../../styles/locationScreenStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';
import { googlePlacesApi } from '../../../config/constants/constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FONTS, fontSize, SIZES } from '../../../config/themes/theme';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { GOOGLE_PLACES_URL } from '../../../apiManager/Client';

const LocationPickerScreen: React.FC<UserNavigationRootProps<"LocationScreen">> = (props) => {

    const mapViewRef = useRef<MapView>(null);
    const dispatch = useDispatch();
    const { accountCreation }: any = useSelector((state: any) => state?.accountCreation);

    const [region, setRegion] = useState({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const [address, setAddress] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const handleConfirmLocation = () => {
        if (!address) {
            Toast.show("please add location", Toast.SHORT);
        }
        const location = {
            latitude: region.latitude,
            longitude: region.longitude,
            address: address,
        };
        const updatedAccountCreation = {
            ...accountCreation,
            location: [...accountCreation?.location, location],
        };
        dispatch(setAccountCreation(updatedAccountCreation));
        props.navigation.navigate('LocationsAndPreferences');
    };

    const handleMapReady = () => {
        if (region && mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    };

    const fetchGooglePlaces = async (inputText: string) => {
        if (inputText.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                `${GOOGLE_PLACES_URL}?input=${inputText}&key=${googlePlacesApi}`
            );
            setSuggestions(response.data?.predictions);
        } catch (error) {
            console.log('Google Places API Error:', error);
        }
    };

    const handleSelectSuggestion = async (placeId: string, description: string) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googlePlacesApi}`
            );
            const details = response.data.result;
            const { lat, lng } = details.geometry.location;
            setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
            setAddress(description);
            setSuggestions([]);
            Keyboard.dismiss();
            if (mapViewRef.current) {
                mapViewRef.current.animateToRegion({
                    latitude: 42.0693,
                    longitude: 19.5126,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            }
        } catch (error) {
            console.log('Place Details Error:', error);
        }
    };

    const renderSuggestionItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}
            onPress={() => handleSelectSuggestion(item.place_id, item.description)}
        >
            <Text>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={locationScreenStyles.mapContainer}>
                        <View style={[locationScreenStyles.searchBar, { justifyContent: 'space-between', }]}>
                            <View style={locationScreenStyles.locationTextContainer}>
                                <View style={{
                                    position: 'absolute',
                                    //   top: 10,
                                    left: 0,
                                    bottom: 10,
                                    zIndex: 2,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <SVGIcons.locationIcon />
                                </View>

                                <TextInput
                                    value={address ? address :searchQuery}
                                    onChangeText={(text) => {
                                        setSearchQuery(text);
                                        fetchGooglePlaces(text);
                                    }}
                                    placeholder="Search Location"
                                    scrollEnabled
                                    multiline={false}
                                    style={[locationScreenStyles.searchText, {
                                        paddingLeft: 35,
                                        height: 45,
                                        paddingVertical: 0,
                                        fontSize: fontSize[13],
                                        lineHeight: 20
                                    }]}
                                />
                            </View>

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    bottom: 0,
                                    zIndex: 2,
                                }}
                                onPress={() => {
                                    setSearchQuery('');
                                    setSuggestions([]);
                                    setAddress('')
                                    setRegion({
                                        latitude: region.latitude,
                                        longitude: region.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    })
                                }}
                            >
                                <SVGIcons.crossIcon />
                            </TouchableOpacity>
                        </View>

                        {suggestions.length > 0 && (
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item) => item.place_id}
                                renderItem={renderSuggestionItem}
                                style={{
                                    position: 'absolute',
                                    top: Platform.OS === 'ios' ? 120 : 70,
                                    left: 20,
                                    right: 20,
                                    backgroundColor: 'white',
                                    zIndex: 5,
                                    maxHeight: 200,
                                    borderRadius: 8,
                                    elevation: 5,
                                }}
                            />
                        )}

                        <MapView
                            ref={mapViewRef}
                            provider={PROVIDER_GOOGLE}
                            style={locationScreenStyles.map}
                            region={region}
                            loadingEnabled
                            zoomControlEnabled
                            onMapReady={handleMapReady}
                        >
                            <Marker coordinate={region} />
                        </MapView>

                        <View style={locationScreenStyles.bottom}>
                            <CustomButton
                                onPress={handleConfirmLocation}
                                title="Confirm Location"
                                style={{ width: "100%" }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
