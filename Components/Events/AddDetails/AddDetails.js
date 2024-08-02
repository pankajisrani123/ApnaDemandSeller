import React, { useState, useEffect, useReducer } from "react";
import { Image, ScrollView, View, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput, ToastAndroid } from "react-native";

import { ActivityIndicator, Button, Modal, Portal, RadioButton, Text, TouchableRipple, TextInput as TextInputPaper } from "react-native-paper";
import Uncheck from '../../../Assets/Icons/circle_uncheck.svg'
import Check from '../../../Assets/Icons/circle_check.svg'
import Back from '../../../Assets/Icons/Back.svg'
import Chat from '../../../Assets/Icons/chat.svg'
import Add from '../../../Assets/Icons/add.svg'
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddDetails = (props) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [images, setImages] = useState([]);
    const [venueId, setVenueId] = useState(0)
    const [venueType, setVenueType] = useState(0)

    const SelectAndUploadImage = () => {
        if (images.length == 8) {
            ToastAndroid.show("Images limit reached, remove some to add more", ToastAndroid.SHORT)
        } else {
            launchImageLibrary({ mediaType: 'photo', quality: 0.6, selectionLimit: 8 }, (res) => {
                if (!res.didCancel) {
                    const selectedImages = res.assets.map(asset => ({
                        uri: asset.uri,
                        type: asset.type,
                        name: asset.fileName
                    }));
                    setLoading(true)
                    // UploadImageGetUrl(selectedImages[0].uri);
                    if (selectedImages.length > 1) {
                        selectedImages.map((image) => {
                            console.log(image.uri);

                        })
                    } else {
                        UploadImageGetUrl(selectedImages[0].uri)
                    }
                }
            });
        }
    };

    const [loading, setLoading] = useState(false)

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

                {images.length > 0 ? (
                    <FlatList
                        data={images}
                        horizontal={false}
                        numColumns={2}
                        scrollEnabled={false}
                        renderItem={renderImages}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.imageGrid}
                    />
                )
                    :
                    <View style={{ marginTop: 50 }}>
                        {loading ?
                            <ActivityIndicator size={30} color="#FFCB40" />
                            :
                            <Text>Select Images to Continue</Text>
                        }
                    </View>}


            </ScrollView>
        )
    }

    const [selectedOptions, setSelectedOptions] = useState({});

    const [parking, setParking] = useState(false)
    const [decoration, setDecoration] = useState(false)
    const [wifi, setWifi] = useState(false)
    const [bar, setBar] = useState(false)
    const [ac, setAc] = useState(false)

    const handleSelect = (questionId, option) => {
        setSelectedOptions({ ...selectedOptions, [questionId]: option });
    };

    const quest = [{
        id: 1,
        options: [{
            id: 1,
            "text": 'Yes',
        },
        {
            id: 2,
            "text": 'No',
        }],
        "text": "Is Parking Available?"
    },
    {
        id: 2,
        options: [{
            id: 1,
            "text": 'Yes',

        }, {
            id: 2,
            "text": 'No',
        }],
        "text": "Is Decoration Available?"
    },
    {
        id: 3,
        options: [{
            id: 1,
            "text": 'Yes',

        }, {
            id: 2,
            "text": 'No',
        }],
        "text": "Is WiFi Available?"
    },
    {
        id: 4,
        options: [{
            id: 1,
            "text": 'Yes',

        }, {
            id: 2,
            "text": 'No',
        }],
        "text": "Is Bar Available?"
    },
    {
        id: 5,
        options: [{
            id: 1,
            "text": 'Yes',

        }, {
            id: 2,
            "text": 'No',
        }],
        "text": "Is A/C Available?"
    }]


    const [quesData, setQuesData] = useState(quest)




    // "Token
    //     +
    //     type: 1
    // category: 1
    // name: Dharamshala
    // description:A spacious hall for conferences.
    //     veg_price: 1500
    // non_veg_price: 2000
    // capacity: 200
    // total_rooms: 5
    // parking: 1
    // decoration: 1
    // wifi: 1
    // bar: 1
    // ac: 1
    // price: 30000
    // location:Downtown City
    // cancellation_policy: Non - refundable"

    useEffect(() => {


        if (props.route.params) {
            setVenueType(props.route.params.type)
            setVenueId(props.route.params.venueId)
        }
    }, [!quesData])

    const BasicDetails = () => {

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

                {/* Parking Question */}
                <View style={{ flex: 1, alignItems: 'flex-start', width: Dimensions.get('window').width }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{quesData[0].text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton status={parking ? "checked" : 'unchecked'} color="#FF5722" onPress={() => {
                            setParking(true)
                        }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Yes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value={parking == null} color="#FF5722"
                            onPress={() => {
                                setParking(false)
                            }}
                            status={!parking ? "checked" : 'unchecked'} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            No
                        </Text>
                    </View>
                </View>

                {/* Decoration */}
                <View style={{ flex: 1, alignItems: 'flex-start', width: Dimensions.get('window').width }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{quesData[1].text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton status={decoration ? "checked" : 'unchecked'} color="#FF5722" onPress={() => {
                            setDecoration(true)
                        }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Yes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value={decoration == null} color="#FF5722"
                            onPress={() => {
                                setDecoration(false)
                            }}
                            status={!decoration ? "checked" : 'unchecked'} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            No
                        </Text>
                    </View>
                </View>

                {/* wifi */}
                <View style={{ flex: 1, alignItems: 'flex-start', width: Dimensions.get('window').width }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{quesData[2].text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton status={wifi ? "checked" : 'unchecked'} color="#FF5722" onPress={() => {
                            setWifi(true)
                        }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Yes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value={wifi == null} color="#FF5722"
                            onPress={() => {
                                setWifi(false)
                            }}
                            status={!wifi ? "checked" : 'unchecked'} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            No
                        </Text>
                    </View>
                </View>

                {/* bar */}

                <View style={{ flex: 1, alignItems: 'flex-start', width: Dimensions.get('window').width }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{quesData[3].text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton status={bar ? "checked" : 'unchecked'} color="#FF5722" onPress={() => {
                            setBar(true)
                        }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Yes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value={bar == null} color="#FF5722"
                            onPress={() => {
                                setWifi(false)
                            }}
                            status={!bar ? "checked" : 'unchecked'} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            No
                        </Text>
                    </View>
                </View>


                {/* ac */}

                <View style={{ flex: 1, alignItems: 'flex-start', width: Dimensions.get('window').width }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{quesData[4].text}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton status={ac ? "checked" : 'unchecked'} color="#FF5722" onPress={() => {
                            setAc(true)
                        }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Yes
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton value={ac == null} color="#FF5722"
                            onPress={() => {
                                setAc(false)
                            }}
                            status={!ac ? "checked" : 'unchecked'} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            No
                        </Text>
                    </View>
                </View>



            </ScrollView>
        );
    };

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [capacity, setCapacity] = useState(0)
    const [price, setPrice] = useState(0)
    const [total_rooms, setTotalRooms] = useState(0)
    const [vegPrice, setVegPrice] = useState(0)
    const [nonVegPrice, setNonVegPrice] = useState(0)
    const [location, setLocation] = useState('')
    const [cancellation_policy, setCancellationPolicy] = useState('')

    const AdditionalDetails = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center', marginTop: 30, marginBottom: 100, height: Dimensions.get('window').height }}>
                {/* Name
                description
                capacity
                rooms
                price
                veg price
                non veg price
                location
                cancellation policy */}

                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    multiline
                    onChangeText={(text) => setDescription(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        height: 100,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Capacity"
                    value={capacity}
                    onChangeText={(text) => setCapacity(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Total Rooms"
                    value={total_rooms}
                    onChangeText={(text) => setTotalRooms(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Price"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Veg Price"
                    value={setVegPrice}
                    onChangeText={(text) => setVegPrice(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Non Veg Price"
                    value={setVegPrice}
                    onChangeText={(text) => setNonVegPrice(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Location"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />
                <TextInput
                    placeholder="Cancellation Policy"
                    value={cancellation_policy}
                    onChangeText={(text) => setCancellationPolicy(text)}
                    style={{
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 0.6,
                        backgroundColor: 'white',
                        paddingHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 10
                    }}
                    cursorColor="#FFCB40"
                />

            </ScrollView>
        )
    }

    const [selectedOptionsVariant, setSelectedOptionsVariant] = useState({});

    const handleSelectVariant = (questionId, option) => {
        setSelectedOptionsVariant({ ...selectedOptionsVariant, [questionId]: option });
    };



    const UploadImageGetUrl = async (selectedImages) => {
        setImages([...images, selectedImages])
    };
    const forceReducer = state => !state;
    const [, forceRerender] = useReducer(forceReducer, false);

    const handleImageClick = (image) => {
        const index = images.indexOf(image)
        var img = images
        if (index > -1) {
            img.splice(index, 1)
        }
        setImages(img)
        forceRerender()

    };

    const [loadingFullScreen, setLoadingFullscreen] = useState(false)

    const CreateVenue = async () => {

        const token = await AsyncStorage.getItem('token')

        if (images.length == 0) {
            const createData = {
                "type": venueType,
                "category": venueId,
                "name": name,
                "description": description ? description : null,
                "veg_price": vegPrice ? vegPrice : null,
                "non_veg_price": nonVegPrice ? nonVegPrice : null,
                "capacity": capacity,
                "total_rooms": total_rooms,
                "parking": parking ? 1 : 0,
                "decoration": decoration ? 1 : 0,
                'wifi': wifi ? 1 : 0,
                'bar': bar ? 1 : 0,
                'ac': ac ? 1 : 0,
                'price': price,
                'location': location,
                "cancellation_policy": cancellation_policy ? cancellation_policy : null,
            }
            console.log(createData);

            axios.post('https://event.apnademand.com/public/api/createvenue', createData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((rs) => {
                console.log(rs.data);

            }).catch((err) => {
                console.log(err);

            })
        } else {


        }

    }



    const renderImages = ({ item }) => (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}>
            <Image source={{ uri: item }} style={styles.image} />
            <TouchableOpacity style={{
                position: 'absolute', top: 20, right: 20,
                backgroundColor: 'darkgray', width: 30, height: 30, borderRadius: 15,
                alignItems: 'center', justifyContent: 'center', opacity: 0.6
            }} onPress={() => { handleImageClick(item) }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, }}>x</Text>
            </TouchableOpacity>
        </View>
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
                <TabButton title={`Basic\nDetails`} isSelected={selectedTab === 1} onPress={() => setSelectedTab(1)} />
                <TabButton title={`Additional\nDetails`} isSelected={selectedTab === 2} onPress={() => setSelectedTab(2)} />
                <TabButton title={`Add\nImages`} isSelected={selectedTab === 3} onPress={() => setSelectedTab(3)} />
            </View>

            {selectedTab == 3 ?
                <AddImages />
                :
                selectedTab == 1 ?
                    <BasicDetails />
                    :
                    selectedTab == 2 ?
                        <AdditionalDetails />
                        :
                        <View></View>}
            <Button buttonColor="#FFCB40" labelStyle={{ paddingVertical: 8 }} style={{ width: '80%', marginVertical: 10 }}
                textColor="white" onPress={() => {
                    if (selectedTab == 3) {
                        CreateVenue()
                    } else {
                        setSelectedTab(selectedTab + 1)
                        console.log(
                            parking,
                            decoration,
                            wifi,
                            bar,
                            ac
                        );
                    }
                }}>
                {selectedTab == 3 ?
                    'Create Venue'
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
        borderColor: 'white',
    },
    container: {
        padding: 16,
    },
    questionContainer: {
        marginBottom: 24,
        width: Dimensions.get('window').width
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
