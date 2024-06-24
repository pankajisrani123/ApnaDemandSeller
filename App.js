import * as React from 'react';
import { View, Text, Button, ToastAndroid } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import LandingPage from './Components/LandingPage';
import SellerLogin from './Components/Ecommerce/SellerLogin';
import EventLogin from './Components/Events/EventLogin';
import EventRegister from './Components/Events/Registration/EventRegister';
import AccountDetailsGST from './Components/Events/Registration/AccountDetailsGST';
import AccountDetailsPAN from './Components/Events/Registration/AccountDetailsPAN';
import BankDetails from './Components/Events/Registration/BankDetails';
import PickupAddress from './Components/Events/Registration/PickupAddress';
import PartnerDetails from './Components/Events/Registration/PartnerDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Dashboard from './Components/Events/Dashboard/Dashboard';
import SelectVenue from './Components/Events/Dashboard/SelectVenue';
import VenueCategories from './Components/Events/Dashboard/VenueCategories';
import Profile from './Components/Events/Dashboard/Profile';
import AddDetails from './Components/Events/AddDetails/AddDetails';
import DashboardEcommerce from './Components/Ecommerce/Dashboard/Dashboard';



const Stack = createNativeStackNavigator();

const App = () => {


    const [token, setToken] = React.useState('')


    const GetToken = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            const emailEcom = await AsyncStorage.getItem('emailEcom')
            const passEcom = await AsyncStorage.getItem('passEcom')
            const loginDataEvent = {
                "email": email,
                "password": password
            }
            const loginDataEcom = {
                "email": emailEcom,
                "password": passEcom
            }

            try {
                if (email && password) {
                    const value = await axios.post('https://apnademand.com/api/venue/login', loginDataEvent).then((rs) => {
                        if (rs.data.token !== null) {
                            setToken(rs.data.token)
                            StoreToken(rs.data.token)

                        }
                    }, err => {
                        ToastAndroid.show("Login Failure, check your credentials!", ToastAndroid.SHORT)
                    })
                }
            }
            catch (e) {
                console.log(e);
            }

        } catch (e) {
            console.log(e);
        }
    };

    const StoreToken = async (value) => {
        await AsyncStorage.setItem('token', value)
    }



    const GetProfile = async (tokenData) => {
        const res = await axios.get('https://apnademand.com/api/venue/get-profile', {
            headers: {
                Authorization: `Bearer ${tokenData}`,
            },
        });

        /**
         * Mail password testing
         * 
         * AIzaSyB_Tnu5hw7u8B4BfcRFIc-0FItvkZjow_Y
         * Google maps api key
         * 
         * react native Geocoder
         * https://www.npmjs.com/package/react-native-geocoding
         * 
         * Event Login:
         * Emailezample@mail.com
           Adi@12345

           Make it dynamic
         */
    }

    React.useEffect(() => {
        Geocoder.init("AIzaSyB_Tnu5hw7u8B4BfcRFIc-0FItvkZjow_Y");
        GetToken()
    }, [])
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, orientation:'portrait', animation:'fade',animationDuration:1000}} >
                    <Stack.Screen name="LandingPage" component={LandingPage} />
                    <Stack.Screen name="SellerLogin" component={SellerLogin} />
                    <Stack.Screen name="EventLogin" component={EventLogin} />
                    <Stack.Screen name="EventRegister" component={EventRegister} />
                    <Stack.Screen name="AccountDetailsGST" component={AccountDetailsGST} />
                    <Stack.Screen name="AccountDetailsPAN" component={AccountDetailsPAN} />
                    <Stack.Screen name="BankDetails" component={BankDetails} />
                    <Stack.Screen name="PickupAddress" component={PickupAddress} />
                    <Stack.Screen name="PartnerDetails" component={PartnerDetails} />
                    <Stack.Screen name='Dashboard' component={Dashboard} />
                    <Stack.Screen name='SelectVenue' component={SelectVenue} />
                    <Stack.Screen name='VenueCategories' component={VenueCategories} />
                    <Stack.Screen name='Profile' component={Profile} />
                    <Stack.Screen name='AddDetails' component={AddDetails} />
                    <Stack.Screen name='DashboardEcommerce' component={DashboardEcommerce} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;