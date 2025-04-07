import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import CustomButton from '../../../components/Buttons/CustomButton';
import { SVGIcons } from '../../../config/constants/svg';
import { locationScreenStyles } from '../../../styles/locationScreenStyles';

const LocationPickerScreen: React.FC<UserNavigationRootProps<"LocationScreen">> = (props) => {
    const [region, setRegion] = useState<Region>({
        latitude: 42.0693,
        longitude: 19.5126,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });


    const handleConfirmLocation = () => {
        props.navigation.navigate('LocationsAndPreferences', {
            selectedLocation: `Shkodër, Albania`,
        });
    };

    return (
        <SafeAreaView style={locationScreenStyles.container}>
            <View style={locationScreenStyles.mapContainer}>
                <View style={locationScreenStyles.searchBar}>
                    <View style={locationScreenStyles.locationTextContainer}>
                        <SVGIcons.locationIcon />
                        <Text style={locationScreenStyles.searchText}>Shkodër, Albania</Text>
                    </View>
                    <TouchableOpacity>
                        <SVGIcons.crossIcon />
                    </TouchableOpacity>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={locationScreenStyles.map}
                    region={region}
                    onRegionChangeComplete={setRegion}
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