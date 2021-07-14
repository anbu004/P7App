import React, { Component } from "react";
import styles from "./style";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    Image,
    ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import api from '../../config/OdooConnect';
// import console = require("console");
import Toast, { DURATION } from 'react-native-easy-toast'
import { BackHandler } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import { List, ListItem, Card, Rating, Header } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Orientation from "react-native-orientation";

export default class PurchaseDashboardScreen extends Component {
    constructor(props) {
        super(props)

        global.MyVar;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.navigate('Dashboardpage');
        return true;
    }


    componentDidMount() {
        Orientation.lockToPortrait();

        this.getKey();
    }

    async getKey() {
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:uid');
            console.log('savedddddvale', value);


            global.MyVar = value;

        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }


    backPress() {
        this.props.navigation.navigate('Dashboardpage');
    }

    onPurchaseordersPress() {

        this.props.navigation.navigate('Purchase')
    }

    onVendorsPress() {
        this.props.navigation.navigate('Vendors')
    }

    

 
    render() {
        return (


            <View style={styles.container}>
                <Header leftComponent={<FontAwesomeIcon name="home" color='#fff' size={22}
                    onPress={() => this.backPress()} />}
                    centerComponent={{ text: 'Purchase', style: { color: '#fff', fontSize: 20 } }}
                    // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                    navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                    containerStyle={{
                        backgroundColor: '#0D50B8',

                    }} />
                {/* <View style={styles.imageContainer}>
                    <Image
                        resizeMode="contain"
                        source={require('../../assets/logo.png')}
                        style={styles.imagelogo}
                    />
                </View> */}

<ImageBackground
                    style={styles.rect}
                    imageStyle={styles.rect_imageStyle}
                    source={require("../../assets/Gradient_LZGIVfZ.png")}
                >

                <View style={{ alignItems: 'center', flexDirection: 'row',marginTop:150 }}>


                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
                    >

                        <TouchableOpacity onPress={() => this.onPurchaseordersPress()}>

                            <View style={styles.imageContainer}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../assets/purchasing.png')}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableOpacity>


                        {/* <Text style={{ color: 'white' }}>Purchase Orders</Text> */}
                        <View style={styles.rect9}>
                                <Text style={styles.text22}>Purchase Orders</Text>
                            </View>
                    </View>


                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
                    >

                        <TouchableOpacity onPress={() => this.onVendorsPress()}>

                            <View style={styles.imageContainer}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../assets/vendors.png')}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableOpacity>


                        {/* <Text style={{ color: 'white' }}>Vendors</Text> */}
                        <View style={styles.rect8}>
                                <Text style={styles.text22}>Vendors</Text>
                            </View>
                    </View>
                    
                </View>



</ImageBackground>


            </View>
        );
    }

}