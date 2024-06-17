import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Card, Portal } from 'react-native-paper';

import Home from '../../Assets/Icons/home.svg'
import Wallet from '../../Assets/Icons/wallet.svg'
import Cart from '../../Assets/Icons/cart.svg'
import Profile from '../../Assets/Icons/profile.svg'


const BottomNavigationBar = ({ navigation }) => {

  const [selection, setSelection] = useState(1)
  const [hidden, setHidden] = useState(false)

  const HideBottomBar = () => {
    setSelection(3)
    navigation.navigate("SelectVenue")
  }

  const HandleNav = () => {
    const nav = navigation.getState()
    if (nav.routes[nav.index].name === "SelectVenue") {
      setHidden(true)
      setSelection(3)
    }

    else if (nav.routes[nav.index].name === "Dashboard") {
      setSelection(1)
      setHidden(false)
    }
    else if (nav.routes[nav.index].name === "Profile") {
      setSelection(4)
      setHidden(false)
    }
    else{
      setHidden(true)
    }
  }

  useEffect(() => {

    // console.log(nav.routes);
    setInterval(HandleNav, 1500)
  },[])

  return (
    <View>
      {hidden ?
        null
        :
        <Portal>
          <Card style={styles.card}>
            <View style={styles.container}>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 55, backgroundColor: selection == 1 ? "#FFCB40" : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  setSelection(1)
                  navigation.navigate("Dashboard")
                }} activeOpacity={0.6}>
                <Home />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 55, backgroundColor: selection == 2 ? "#FFCB40" : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { setSelection(2) }} activeOpacity={0.6}>
                <Wallet />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 55, backgroundColor: selection == 3 ? "#FFCB40" : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  HideBottomBar()

                }} activeOpacity={0.6}>
                <Cart />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 55, backgroundColor: selection == 4 ? "#FFCB40" : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  setSelection(4)
                  navigation.navigate("Profile")
                }} activeOpacity={0.6}>
                <Profile />
              </TouchableOpacity>
            </View>
          </Card>
        </Portal>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    opacity: 0.8,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 70,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  },
  button: {
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default BottomNavigationBar;
