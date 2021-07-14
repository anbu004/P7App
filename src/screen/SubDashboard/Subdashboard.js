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
    ImageBackground,
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

export default class SubDashboardScreen extends Component {
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

    onEnquiryPress() {

        this.props.navigation.navigate('Enquiry')
    }

    onQuotationPress() {
        this.props.navigation.navigate('Quotation')
    }
    onSalesPress() {
        this.props.navigation.navigate('Sales')

    }
    onCustomerPress() {
        this.props.navigation.navigate('Customer')
    }

    onOpportunitiesPress() {
        this.props.navigation.navigate('Opportunity')
    }

    render() {
        return (

            <View style={styles.container}>
                <Header leftComponent={<FontAwesomeIcon name="home" color='#fff' size={22}
                    onPress={() => this.backPress()} />}
                    centerComponent={{ text: 'CRM', style: { color: '#fff', fontSize: 20 } }}
                    // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                    navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                    containerStyle={{
                        backgroundColor: '#0D50B8',

                    }} />

                <ImageBackground
                    style={styles.rect}
                    imageStyle={styles.rect_imageStyle}
                    source={require("../../assets/Gradient_LZGIVfZ.png")}
                >
                    {/* <View style={styles.imageContainer}>
                    <Image
                        resizeMode="contain"
                        source={require('../../assets/logo.png')}
                        style={styles.imagelogo}
                    />
                </View> */}

                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
                        >

                            <TouchableOpacity onPress={() => this.onEnquiryPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/leader.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>


                            {/* <Text style={{ color: 'white' }}>Leads</Text> */}
                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Leads</Text>
                            </View>
                        </View>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => this.onQuotationPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/percent.png')}
                                        style={styles.image}
                                    />
                                </View>

                            </TouchableOpacity>
                            {/* <Text style={{ color: 'white' }}>Quotations</Text> */}
                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Quotations</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>



                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => this.onSalesPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/sale.png')}
                                        style={styles.image}
                                    />
                                </View>

                            </TouchableOpacity>
                            {/* <Text style={{ color: 'white' }}>Sales</Text> */}
                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Sales</Text>
                            </View>
                        </View>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => this.onCustomerPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/cus.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            {/* <Text style={{ color: 'white' }}>Customer Details</Text> */}
                            <View style={styles.rect9}>
                                <Text style={styles.text22}>Customer Details</Text>
                            </View>
                        </View>



                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>

                            <TouchableOpacity onPress={() => this.onOpportunitiesPress()}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/growth.png')}
                                        style={styles.image}
                                    />
                                </View>

                            </TouchableOpacity>
                            {/* <Text style={{ color: 'white' }}>Opportunity</Text> */}
                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Opportunity</Text>
                            </View>
                        </View>



                    </View>

                </ImageBackground>

            </View>
        );
    }

}