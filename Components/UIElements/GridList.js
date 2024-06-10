import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import Location from '../../Assets/Icons/location.svg'
import Star from '../../Assets/Icons/star.svg'

const GridList = ({ data }) => {
    const renderItem = ({ item }) => {
        return (
            <Card style={{ width: Dimensions.get('window').width / 2.3, marginTop: 20, marginHorizontal: 10 }}>
                <Image source={item.img} style={{ flex: 0.5, width: '100%', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginHorizontal: 5, marginVertical: 10 }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 5 }}>
                    <Location />
                    <Text style={{ fontSize: 10, paddingHorizontal: 5 }}>{item.location}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 5, marginTop: 25, marginBottom: 10 }}>
                        <Text style={{ color: '#FF0000', fontWeight: 'bold', }}>₹</Text>
                        <Text style={{ color: '#000000', fontWeight: 'bold', }}>{item.price}</Text>
                        <Text style={{ fontSize: 12 }}>Day</Text>
                    </View>
                    <View style={{ marginTop: 15, marginEnd: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#F8B84E', marginEnd: 2 }}>{item.rating}</Text>
                        <Star />
                    </View>
                </View>
            </Card>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    location: {
        fontSize: 14,
        color: 'grey',
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    rating: {
        fontSize: 14,
        color: 'gold',
        marginTop: 5,
        marginBottom: 10,
    },
    flatListContent: {
        paddingBottom: 100,
    },
});

export default GridList;
