import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import Location from '../../Assets/Icons/location.svg'
import Star from '../../Assets/Icons/star.svg'

const GridListEcom = ({ data }) => {
    const renderItem = ({ item }) => {
        return (
            <Card style={{ width: Dimensions.get('window').width / 2.3, marginTop: 20, marginHorizontal: 10 }}>
                <Image source={item.img} style={{ flex: 1, width: '100%', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
                
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

export default GridListEcom;
