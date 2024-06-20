import React, { useState, useEffect } from "react";
import { Image, ScrollView, View, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput, ToastAndroid } from "react-native";
import { Button, RadioButton, Text, TouchableRipple } from "react-native-paper";
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

    const AddImages = () => {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
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
        )
    }

    const [selectedOptions, setSelectedOptions] = useState({});

    const handleSelect = (questionId, option) => {
        setSelectedOptions({ ...selectedOptions, [questionId]: option });
    };

    const BasicDetails = () => {
        const quesData = [
            { id: 1, ques: 'Is Parking Available?', options: ['There is Sufficient Parking Available', 'Parking Is Available near the venue', 'No Parking available'] },
            { id: 2, ques: 'Please Describe Your Cancellation Policy', options: ['Partial Refund Offered', 'No Refund Offered', 'No Refund Offered However Date Adjustment Can Be Done', 'Full Refund Offered'] },
            { id: 3, ques: 'Please Describe Your Cancellation Policy', options: ['Partial Refund Offered', 'No Refund Offered', 'No Refund Offered However Date Adjustment Can Be Done', 'Full Refund Offered'] },
            { id: 4, ques: 'Please Describe Your Cancellation Policy', options: ['Partial Refund Offered', 'No Refund Offered', 'No Refund Offered However Date Adjustment Can Be Done', 'Full Refund Offered'] },
            { id: 5, ques: 'Please Describe Your Cancellation Policy', options: ['Partial Refund Offered', 'No Refund Offered', 'No Refund Offered However Date Adjustment Can Be Done', 'Full Refund Offered'] },
        ];

        

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                {quesData.map((item) => (

                    <View key={item.id} style={styles.questionContainer}>
                        <Text style={styles.question}>{item.ques}</Text>
                        <RadioButton.Group onValueChange={(value) => handleSelect(item.id, value)} value={selectedOptions[item.id]}>
                            {item.options.map((option, index) => (
                                <View key={index} style={styles.radioButtonContainer}>
                                    <RadioButton value={option} color="#FF5722" />
                                    <Text style={styles.optionText}>{option}</Text>
                                </View>
                            ))}
                        </RadioButton.Group>
                    </View>
                ))}
            </ScrollView>
        );
    };


    const AdditionalDetails = () => {
        const additionalData = [
            { id: 1, label: 'Guest Capacity', placeholder: '600', expand: false },
            { id: 2, label: 'Minimum Guests', placeholder: '60', expand: false },
            { id: 3, label: 'Per Guest Price', placeholder: '₹ 300', expand: false },
            { id: 4, label: 'Fix Prices 60 Guests', placeholder: '₹ 25000', expand: true },
            { id: 5, label: 'Per Guest Non Veg Price', placeholder: '₹ 300', expand: false },
            { id: 6, label: 'Fix Price Non Veg 60 Guests', placeholder: '₹ 25000', expand: true },
            { id: 7, label: 'Per Guest Veg Price', placeholder: '₹ 300', expand: false },
            { id: 8, label: 'Fix Price Veg 60 Guests', placeholder: '₹ 25000', expand: true },
        ]
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center', marginTop: 30 }}>
                {additionalData.map((item, index) => {
                    return (
                        <View key={item.id} style={{
                            flexDirection: 'row', width: '80%', height: 45, backgroundColor: 'white',
                            borderRadius: 10, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center',
                            borderColor: 'gray', marginTop: 10
                        }}>
                            <Text style={{ fontSize: 16, marginStart: 10 }}>{item.label}</Text>
                            <View style={{
                                height: '110%', width: '30%',
                                borderStartWidth: 1, borderRadius: 9,
                                borderColor: 'gray', alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TextInput maxLength={5} placeholder={item.placeholder} />
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }

    const [selectedOptionsVariant, setSelectedOptionsVariant] = useState({});

        const handleSelectVariant = (questionId, option) => {
            setSelectedOptionsVariant({ ...selectedOptionsVariant, [questionId]: option });
        };

    const AddVariant = () => {
        const quesData = [
            { id: 1, ques: 'Banquet Halls', options: ['4 A/C Rooms', '100 Bike Parking', '10 Four Wheeler Parkings'] },
            { id: 2, ques: 'Non Veg', options: ['Egg Manchurian', 'Egg Manchurian 1', 'Egg Manchurian 2', 'Egg Manchurian 3'] },
            { id: 3, ques: 'Veg', options: ['Veg Manchurian', 'Veg Manchurian 1', 'Veg Manchurian 2', 'Veg Manchurian 3', 'Veg Manchurian 4', 'Veg Manchurian 5'] },
        ];

        

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                {quesData.map((item) => (

                    <View key={item.id} style={styles.questionContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Dimensions.get('window').width }}>
                            <Text style={styles.question}>{item.ques}</Text>
                            <TextInput placeholder="" style={{
                                width: 100, height: 30,
                                backgroundColor: 'white', borderRadius: 10
                            }} />
                        </View>
                        <RadioButton.Group onValueChange={(value) => handleSelectVariant(item.id, value)} value={selectedOptionsVariant[item.id]}>
                            {item.options.map((option, index) => (
                                <View key={index} style={styles.radioButtonContainer}>
                                    <RadioButton value={option} color="#FF5722" />
                                    <Text style={styles.optionText}>{option}</Text>
                                </View>
                            ))}
                        </RadioButton.Group>
                    </View>
                ))}
                <Text style={{ marginVertical: 5, fontWeight: 'bold', fontSize: 16 }}>Description</Text>
                <TextInput style={{ borderColor: '#FFCB40', borderWidth: 1, width: '80%', height: 100, backgroundColor: 'white' }} />
            </ScrollView>
        );
    }

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
                console.log(data.images);
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

            {selectedTab == 1 ?
                <AddImages />
                :
                selectedTab == 2 ?
                    <BasicDetails />
                    :
                    selectedTab == 3 ?
                        <AdditionalDetails />
                        :
                        selectedTab == 4 ?
                            <AddVariant />
                            :
                            <View></View>}
            <Button buttonColor="#FFCB40" labelStyle={{ paddingVertical: 8 }} style={{ width: '80%', marginVertical: 10 }}
                textColor="white" onPress={() => {
                    if (selectedTab == 4) {
                        ToastAndroid.show("Details added successfully", ToastAndroid.SHORT)
                        props.navigation.goBack()
                    } else {
                        setSelectedTab(selectedTab + 1)
                    }
                }}>
                {selectedTab == 4 ?
                    'Review'
                    :
                    'Continue'}
            </Button>
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
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        margin: 15,
        borderColor: 'white'
    },
    container: {
        padding: 16,
    },
    questionContainer: {
        marginBottom: 24,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    optionText: {
        fontSize: 14,
    },
});

export default AddDetails;
