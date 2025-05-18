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
import { setPostJobReducer } from '../../../stores/reducer/PostJobReducer';

const LocationPickerScreen: React.FC<UserNavigationRootProps<"LocationScreen">> = (props) => {

    const mapViewRef = useRef<MapView>(null);
    const dispatch = useDispatch();
    const { accountCreation }: any = useSelector((state: any) => state?.accountCreation);
    const screenName = props.route?.params?.screenName
    const { postJob }: any = useSelector((state: any) => state?.postJob)
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
        const location = {
            latitude: region.latitude,
            longitude: region.longitude,
            address: address,
        };
        if (!address) {
            Toast.show("please add location", Toast.SHORT);
            return
        }
        if (screenName === "postJob") {
            const updatelocation = {
                ...postJob,
                location: [location],
            };
            dispatch(setPostJobReducer(updatelocation));
            props.navigation.navigate('Tabs', {
                screen: 'PostJobScreen',
            });
        } else {

            const updatedAccountCreation = {
                ...accountCreation,
                location: [...accountCreation?.location, location],
            };
            dispatch(setAccountCreation(updatedAccountCreation));
            props.navigation.navigate('LocationsAndPreferences');
        }
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
                    latitude: lat,
                    longitude: lng,
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
                                    value={address ? address : searchQuery}
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
                                        latitude: 42.0693,
                                        longitude: 19.5126,
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
// import React, { useState, useRef, useEffect } from 'react';
// import { SafeAreaView, View, TouchableOpacity, Text, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native';
// import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
// import { UserNavigationRootProps } from '../../../types/stacksParams';
// import CustomButton from '../../../components/Buttons/CustomButton';
// import { SVGIcons } from '../../../config/constants/svg';
// import { locationScreenStyles } from '../../../styles/locationScreenStyles';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';
// import { googlePlacesApi } from '../../../config/constants/constants';
// import { FONTS, fontSize, SIZES } from '../../../config/themes/theme';
// import axios from 'axios';
// import Toast from 'react-native-simple-toast';
// import { GOOGLE_PLACES_URL } from '../../../apiManager/Client';
// import { setPostJobReducer } from '../../../stores/reducer/PostJobReducer';

// interface LocationPickerScreenProps extends UserNavigationRootProps<"LocationScreen"> {
//     staticRegion?: Region;
//     staticAddress?: string;
// }

// const LocationPickerScreen: React.FC<LocationPickerScreenProps> = (props) => {
//     const { staticRegion, staticAddress } = props;
//     const mapViewRef = useRef<MapView>(null);
//     const dispatch = useDispatch();
//     const { accountCreation }: any = useSelector((state: any) => state?.accountCreation);
//     const screenName = props.route?.params?.screenName;
//     const { postJob }: any = useSelector((state: any) => state?.postJob);

//     // Initialize region with either the passed staticRegion or default values
//     const [region, setRegion] = useState<Region>(staticRegion || {
//         latitude: 42.0693,
//         longitude: 19.5126,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//     });

//     const [address, setAddress] = useState("456 Elm St, Los Angeles, CA 90001");

//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState<any[]>([]);

//     // Set initial location when component mounts or staticRegion changes
//     useEffect(() => {
//         if (staticRegion) {
//             setRegion(staticRegion);
//             if (mapViewRef.current) {
//                 mapViewRef.current.animateToRegion(staticRegion);
//             }
//         }
//     }, [staticRegion]);

//     // Set address when staticAddress changes
//     useEffect(() => {
//         if (staticAddress) {
//             setAddress(staticAddress);
//         }
//     }, [staticAddress]);

//     const handleConfirmLocation = () => {
//         const location = {
//             latitude: region.latitude,
//             longitude: region.longitude,
//             address: address,
//         };
//         if (!address) {
//             Toast.show("Please add location", Toast.SHORT);
//             return;
//         }

//         if (screenName === "postJob") {
//             const updatelocation = {
//                 ...postJob,
//                 location: [location],
//             };
//             dispatch(setPostJobReducer(updatelocation));
//             props.navigation.navigate('Tabs', {
//                 screen: 'PostJobScreen',
//             });
//         } else {
//             const updatedAccountCreation = {
//                 ...accountCreation,
//                 location: [...accountCreation?.location, location],
//             };
//             dispatch(setAccountCreation(updatedAccountCreation));
//             props.navigation.navigate('LocationsAndPreferences');
//         }
//     };

//     const handleMapReady = () => {
//         if (region && mapViewRef.current) {
//             mapViewRef.current.animateToRegion({
//                 latitude: region.latitude,
//                 longitude: region.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             });
//         }
//     };

//     const fetchGooglePlaces = async (inputText: string) => {
//         if (inputText.length < 3) {
//             setSuggestions([]);
//             return;
//         }
//         try {
//             const response = await axios.get(
//                 `${GOOGLE_PLACES_URL}?input=${inputText}&key=${googlePlacesApi}`
//             );
//             console.log('response.data', response.data)
//             setSuggestions(response.data?.predictions);
//         } catch (error) {
//             console.log('Google Places API Error:', error);
//         }
//     };

//     const handleSelectSuggestion = async (placeId: string, description: string) => {
//         try {
//             const response = await axios.get(
//                 `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googlePlacesApi}`
//             );
//             const details = response.data.result;
//             const { lat, lng } = details.geometry.location;
//             const newRegion = {
//                 latitude: lat,
//                 longitude: lng,
//                 latitudeDelta: 0.05,
//                 longitudeDelta: 0.05,
//             };
//             setRegion(newRegion);
//             setAddress(description);
//             setSuggestions([]);
//             Keyboard.dismiss();
//             if (mapViewRef.current) {
//                 mapViewRef.current.animateToRegion(newRegion);
//             }
//         } catch (error) {
//             console.log('Place Details Error:', error);
//         }
//     };

//     const renderSuggestionItem = ({ item }: { item: any }) => (
//         <TouchableOpacity
//             style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}
//             onPress={() => handleSelectSuggestion(item.place_id, item.description)}
//         >
//             <Text>{item.description}</Text>
//         </TouchableOpacity>
//     );

//     const handleResetLocation = () => {
//         setSearchQuery('');
//         setSuggestions([]);
//         setAddress(staticAddress || '');
//         const resetRegion = staticRegion || {
//             latitude: 42.0693,
//             longitude: 19.5126,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//         };
//         setRegion(resetRegion);
//         if (mapViewRef.current) {
//             mapViewRef.current.animateToRegion(resetRegion);
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             >
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     <View style={locationScreenStyles.mapContainer}>
//                         <View style={[locationScreenStyles.searchBar, { justifyContent: 'space-between' }]}>
//                             <View style={locationScreenStyles.locationTextContainer}>
//                                 <View style={{
//                                     position: 'absolute',
//                                     left: 0,
//                                     bottom: 10,
//                                     zIndex: 2,
//                                     alignItems: "center",
//                                     justifyContent: "center"
//                                 }}>
//                                     <SVGIcons.locationIcon />
//                                 </View>

//                                 <TextInput
//                                     value={address ? address : searchQuery}
//                                     onChangeText={(text) => {
//                                         setSearchQuery(text);
//                                         fetchGooglePlaces(text);
//                                     }}
//                                     placeholder="Search Location"
//                                     scrollEnabled
//                                     multiline={false}
//                                     style={[locationScreenStyles.searchText, {
//                                         paddingLeft: 35,
//                                         height: 45,
//                                         paddingVertical: 0,
//                                         fontSize: fontSize[13],
//                                         lineHeight: 20
//                                     }]}
//                                 />
//                             </View>

//                             <TouchableOpacity
//                                 style={{
//                                     position: 'absolute',
//                                     top: 10,
//                                     right: 10,
//                                     bottom: 0,
//                                     zIndex: 2,
//                                 }}
//                                 onPress={handleResetLocation}
//                             >
//                                 <SVGIcons.crossIcon />
//                             </TouchableOpacity>
//                         </View>

//                         {suggestions.length > 0 && (
//                             <FlatList
//                                 data={suggestions}
//                                 keyExtractor={(item) => item.place_id}
//                                 renderItem={renderSuggestionItem}
//                                 style={{
//                                     position: 'absolute',
//                                     top: Platform.OS === 'ios' ? 120 : 70,
//                                     left: 20,
//                                     right: 20,
//                                     backgroundColor: 'white',
//                                     zIndex: 5,
//                                     maxHeight: 200,
//                                     borderRadius: 8,
//                                     elevation: 5,
//                                 }}
//                             />
//                         )}

//                         <MapView
//                             ref={mapViewRef}
//                             provider={PROVIDER_GOOGLE}
//                             style={locationScreenStyles.map}
//                             region={region}
//                             loadingEnabled
//                             zoomControlEnabled
//                             onMapReady={handleMapReady}
//                             onRegionChangeComplete={(newRegion) => {
//                                 setRegion(newRegion);
//                             }}
//                         >
//                             <Marker coordinate={region} />
//                         </MapView>

//                         <View style={locationScreenStyles.bottom}>
//                             <CustomButton
//                                 onPress={handleConfirmLocation}
//                                 title="Confirm Location"
//                                 style={{ width: "100%" }}
//                             />
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// };

// export default LocationPickerScreen;
