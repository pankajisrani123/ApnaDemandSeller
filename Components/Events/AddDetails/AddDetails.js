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

const AddDetails = (props) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [images, setImages] = useState([]);
    const [venueId, setVenueId] = useState('')
    const [venueType, setVenueType] = useState('')

    const SelectAndUploadImage = () => {
        if(images.length == 8){
            ToastAndroid.show("Images limit reached, remove some to add more", ToastAndroid.SHORT)
        }else{
            launchImageLibrary({ mediaType: 'photo', quality: 0.6, selectionLimit: 8 }, (res) => {
                if (!res.didCancel) {
                    const selectedImages = res.assets.map(asset => ({
                        uri: asset.uri,
                        type: asset.type,
                        name: asset.fileName
                    }));
                    setLoading(true)
                    UploadImageGetUrl(selectedImages[0].uri);
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
    const [description, setDescription] = useState(' ')
    const [capacity, setCapacity] = useState('')
    const [price, setPrice] = useState('')
    const [total_rooms, setTotalRooms] = useState('')
    const [vegPrice, setVegPrice] = useState('')
    const [nonVegPrice, setNonVegPrice] = useState('')
    const [location, setLocation] = useState('')
    const [cancellation_policy, setCancellationPolicy] = useState('')

    const AdditionalDetails = () => {
        const additionalData = [
            { id: 1, label: 'Guest Capacity', placeholder: '600', expand: false },
        ]
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center', marginTop: 30, marginBottom:100, height:Dimensions.get('window').height}}>

                <TextInputPaper label="Name" mode="outlined" cursorColor="#FFCB40" activeOutlineColor="#FFCB40"
                    style={{ width: '79%' }} value={name} onChange={(txt) => { setName(txt) }} />
                <TextInputPaper label="Description" mode="outlined" cursorColor="#FFCB40" activeOutlineColor="#FFCB40"
                    placeholder="Venue Description"
                    style={{ width: '79%', height: 100 }} value={description} onChange={(txt) => { setDescription(txt) }}
                    multiline />
                {/* Capacity */}
                <View style={{
                    flexDirection: 'row', width: '80%', height: 45, backgroundColor: 'white',
                    borderRadius: 10, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center',
                    borderColor: 'gray', marginTop: 10
                }}>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>Guest Capacity</Text>
                    <View style={{
                        height: '110%', width: '30%',
                        borderStartWidth: 1, borderRadius: 9,
                        borderColor: 'gray', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput maxLength={5} placeholder="600" onChangeText={(txt) => { setCapacity(txt) }} value={capacity} />
                    </View>
                </View>

                {/* Total Rooms */}
                <View style={{
                    flexDirection: 'row', width: '80%', height: 45, backgroundColor: 'white',
                    borderRadius: 10, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center',
                    borderColor: 'gray', marginTop: 10
                }}>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>Total Rooms</Text>
                    <View style={{
                        height: '110%', width: '30%',
                        borderStartWidth: 1, borderRadius: 9,
                        borderColor: 'gray', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput maxLength={5} placeholder="5" onChangeText={(txt) => { setTotalRooms(txt) }} value={total_rooms} />
                    </View>
                </View>

                {/* price */}
                <View style={{
                    flexDirection: 'row', width: '80%', height: 45, backgroundColor: 'white',
                    borderRadius: 10, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center',
                    borderColor: 'gray', marginTop: 10
                }}>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>Price</Text>
                    <View style={{
                        height: '110%', width: '30%',
                        borderStartWidth: 1, borderRadius: 9,
                        borderColor: 'gray', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput maxLength={15} placeholder="30,000" onChangeText={(txt) => { setPrice(txt) }} value={price} />
                    </View>
                </View>

                {/* Veg Price */}

                <View style={{
                    flexDirection: 'row', width: '80%', height: 45, backgroundColor: 'white',
                    borderRadius: 10, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center',
                    borderColor: 'gray', marginTop: 10
                }}>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>Veg Price</Text>
                    <View style={{
                        height: '110%', width: '30%',
                        borderStartWidth: 1, borderRadius: 9,
                        borderColor: 'gray', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput maxLength={15} placeholder="2,000" onChangeText={(txt) => { setVegPrice(txt) }} value={vegPrice} />
                    </View>
                </View>

                {/* non veg price */}
                <View style={{
                    flexDirection: 'row', width: '80%', height: 45, backgroundColor: 'white',
                    borderRadius: 10, borderWidth: 1, justifyContent: 'space-between', alignItems: 'center',
                    borderColor: 'gray', marginTop: 10
                }}>
                    <Text style={{ fontSize: 16, marginStart: 10 }}>Non Veg Price</Text>
                    <View style={{
                        height: '110%', width: '30%',
                        borderStartWidth: 1, borderRadius: 9,
                        borderColor: 'gray', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextInput maxLength={15} placeholder="5,000" onChangeText={(txt) => { setNonVegPrice(txt) }} value={nonVegPrice} />
                    </View>
                </View>

                {/* Location */}
                <TextInputPaper label="Venue Location" mode="outlined" cursorColor="#FFCB40" activeOutlineColor="#FFCB40"
                    style={{ width: '79%' }} value={location} onChange={(txt) => { setLocation(txt) }} />

                {/* Cancellation Policy */}
                <TextInputPaper label="Cancellation Policy" mode="outlined" cursorColor="#FFCB40" activeOutlineColor="#FFCB40"
                    style={{ width: '79%' }} value={cancellation_policy} onChange={(txt) => { setCancellationPolicy(txt) }} />
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

    const CreateVenue = () => {
        setLoading(true)
        console.log(images);
        ToastAndroid.show(`Venue ${name} Created Successfully`, ToastAndroid.SHORT)
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
