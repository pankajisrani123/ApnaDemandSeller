import React, { useState, useEffect } from "react";
import { Image, ScrollView, View, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import Uncheck from '../../../Assets/Icons/circle_uncheck.svg'
import Check from '../../../Assets/Icons/circle_check.svg'
import Back from '../../../Assets/Icons/Back.svg'
import Chat from '../../../Assets/Icons/chat.svg'
import Add from '../../../Assets/Icons/add.svg'
import { launchImageLibrary } from "react-native-image-picker";

const AddDetails = (props) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [images, setImages] = useState([]);

    const SelectAndUploadImage = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.6, selectionLimit: 8 }, (res) => {
            if (!res.didCancel) {
                const selectedImages = res.assets.map(asset => ({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName
                }));
                UploadImageGetUrl(selectedImages);
            }
        });
    };

    const UploadImageGetUrl = async (selectedImages) => {
        const formData = new FormData();
        formData.append('seller_id', 2); // Replace with actual seller_id
        selectedImages.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        const apiUrl = 'https://apnademand.com/api/venue/storeImages';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            });

            const data = await response.json();
            if (data.images) {
                setImages(data.images); // Assuming API returns array of image URLs
            } else {
                console.error('Error uploading images:', data);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleImageClick = (image) => {
        console.log('Image clicked:', image);
        // Navigate or perform action when an image is clicked
    };

    const renderImages = ({ item }) => (
        <TouchableOpacity onPress={() => handleImageClick(item)} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center", padding: 10, flex: 1 }} scrollEnabled>
            {/* App Background - Assuming it's a fixed background */}
            <Image source={require('../../../Assets/Images/AppBg.png')} style={{ position: 'absolute' }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableRipple onPress={() => props.navigation.goBack()} style={styles.backButton} borderless>
                        <View style={styles.backButtonContainer}>
                            <Back />
                        </View>
                    </TouchableRipple>
                    <Text style={{ marginStart: 10, fontSize: 20 }}>Add Details</Text>
                </View>
                <TouchableRipple onPress={() => { }} style={styles.chatButton} borderless>
                    <Chat />
                </TouchableRipple>
            </View>

            <View style={styles.tabContainer}>
                <TabButton title={`Add\nImages`} isSelected={selectedTab === 1} onPress={() => setSelectedTab(1)} />
                <TabButton title={`Basic\nDetails`} isSelected={selectedTab === 2} onPress={() => setSelectedTab(2)} />
                <TabButton title={`Additional\nDetails`} isSelected={selectedTab === 3} onPress={() => setSelectedTab(3)} />
                <TabButton title={`Add\nVariant`} isSelected={selectedTab === 4} onPress={() => setSelectedTab(4)} />
            </View>

            <Text style={styles.selectedImagesText}>Cover Images Selected: {images.length} / 8 (Max limit is 8)</Text>
            <TouchableRipple onPress={() => SelectAndUploadImage()} borderless style={styles.addButton}>
                <View style={styles.addButtonContainer}>
                    <Image source={require('../../../Assets/Images/pickbg.png')} style={styles.addButtonImage} />
                    <Add />
                    <Text style={styles.addButtonLabel}>Add Image</Text>
                </View>
            </TouchableRipple>

            {images.length > 0 && (
                <FlatList
                    data={images}
                    horizontal={false}
                    numColumns={2}
                    
                    renderItem={renderImages}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.imageGrid}
                />
            )}
        </ScrollView>
    );
};

const TabButton = ({ title, icon, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={isSelected ? styles.selectedTabButton : styles.tabButton}>
        {isSelected ? <Check /> : <Uncheck />}
        {icon}
        <Text style={styles.tabButtonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'white',
        opacity: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTabButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        textAlign: 'center',
        marginTop: 5,
    },
    selectedImagesText: {
        marginTop: 30,
    },
    addButton: {
        borderRadius: 20,
        marginTop: 10,
    },
    addButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 306,
        height: 204,
        position: 'relative',
    },
    addButtonImage: {
        position: 'absolute',
        alignSelf: 'center',
        top: 0,
    },
    addButtonLabel: {
        fontSize: 25,
        marginTop: 20,
    },
    imageGrid: {
        marginTop: 20,
    },
    image: {
        width: 140,
        height: 140,
        alignSelf:'center',
        borderRadius:20,
        borderWidth:1,
        margin:15,
        borderColor:'white'
    },
});

export default AddDetails;
