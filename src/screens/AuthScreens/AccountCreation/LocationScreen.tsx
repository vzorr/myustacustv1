import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import CustomButton from '../../../components/Buttons/CustomButton';
import { SVGIcons } from '../../../config/constants/svg';
import { locationScreenStyles } from '../../../styles/locationScreenStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { googleLocationApiKey } from '../../../config/constants/constants';

Geocoder.init(googleLocationApiKey);
const LocationPickerScreen: React.FC<UserNavigationRootProps<"LocationScreen">> = (props) => {
    const [address, setAddress] = useState("");

    const mapViewRef = useRef(null);
    const [region, setRegion] = useState<Region>({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
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
    useEffect(() => {
        Geocoder.init(googleLocationApiKey, { language: "en" }); // Initialize only once!
    }, []);
    useEffect(() => {
        checkPermissions()
    }, [])
    const checkPermissions = async () => {
        try {
            if (Platform.OS === 'android') {
                const result = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (result === PermissionsAndroid.RESULTS.GRANTED) {
                    // getLocationAndNavigate()
                } else {
                }
            } else {
                Geolocation.requestAuthorization('always').then((res) => {
                    if (res === "granted") {
                        // getLocationAndNavigate()

                    }
                });
            }
        } catch (error) {
        }
    }

    const handleRegionChange = (newRegion: any) => {
        setRegion(newRegion);
        Geocoder.from(newRegion.latitude, newRegion.longitude)
            .then((res) => {
                const addressComponent = res.results[0].formatted_address;
                setAddress(addressComponent)
            })
            .catch((error) => console.warn(error));
    };
    const getLocationAndNavigate = () => {
        try {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCoordinates: any = { latitude, longitude };

                    setRegion(newCoordinates);

                    Geocoder.from(latitude, longitude)
                        .then(json => {
                            const addressComponent = json.results[0].formatted_address;
                            setAddress(addressComponent);
                        })
                        .catch(error => console.warn("Geocode error:", error));
                },
                (error) => {
                    console.error("Location error:", error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } catch (error) {
            console.error('Unexpected location error:', error);
        }
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
                        <View style={{ left: -10 }}>
                            <SVGIcons.locationIcon />
                        </View>
                        <View style={{ width: "80%" }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={locationScreenStyles.searchText}>{address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity >
                        <SVGIcons.crossIcon />
                    </TouchableOpacity>
                </View>
                <MapView
                    // provider={PROVIDER_GOOGLE}
                    ref={mapViewRef}
                    style={locationScreenStyles.map}
                    region={region}
                    loadingEnabled
                    onRegionChangeComplete={handleRegionChange}
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