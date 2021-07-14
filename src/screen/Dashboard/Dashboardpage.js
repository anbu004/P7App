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
import { Icon } from 'react-native-elements';
import api from '../../config/OdooConnect';
// import console = require("console");
import Toast, { DURATION } from 'react-native-easy-toast'
import { TouchableHighlight } from "react-native-gesture-handler";
import Orientation from "react-native-orientation";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            password: '',
            show: true
        };
        global.MyVar;
        global.uid;
    }

    state = {
        opp_Params: {},
        data: [],
    }

    componentDidMount() {
        console.log('loggedout');
        Orientation.lockToPortrait();
        this.getKey();
        this.checkinoutstatus();
    }

    async getKey() {
        try {

            if (AsyncStorage.getItem('@MySuperStore:uid') != null) {
                const valueuid = await AsyncStorage.getItem('@MySuperStore:uid');
                console.log('savedddddvale', valueuid);


                global.uid = valueuid;


                console.log('global.uid', global.uid)
            }


        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

   

    checkinoutstatus() {
        const params = {
            domain: [["user_id", "=", parseInt(global.uid)]],
            fields: ["attendance_state", "name"],
            order: '',
            limit: '',

            offset: '',
        }

        return api.searchRead('hr.employee', params)
            .then(response => {
                console.log(response)
                if (response.success) {
                    this.setState({
                        data: response.data,

                    });

                    global.MyVar = this.state.data[0].name;
                    if (this.state.data[0].attendance_state == "checked_in") {
                        console.log('checked_in', this.state.data[0].attendance_state)
                        this.setState({ visible: true })

                    } else {
                        console.log('checked_out', this.state.data[0].attendance_state)
                        this.setState({ visible: false })

                    }

                }
            },
            )
            .catch(err => console.log(err))
    }


    onCRMPress() {

        this.props.navigation.navigate('SubDashboard')


    }

    onSalesPress() {
        this.props.navigation.navigate('SalesSubDashboard')

    }

    onVendorInvoicePress() {
        this.props.navigation.navigate('VendorInvoice')

    }

    onPurchasePress() {
        this.props.navigation.navigate('PurchaseDashboard')

    }

    onHRModulePress() {
        this.props.navigation.navigate('HRModuleSubDashboard')
    }

    onSettingsPress() {
        this.props.navigation.navigate('Settings')
    }

    onInventoryPress() {
        this.props.navigation.navigate('InventoryDashboard')
    }

    onCheckinCheckoutPress() {
        this.props.navigation.navigate('CheckinCheckout')
    }

    onQRPress() {
        this.props.navigation.navigate('QRScan')
    }

    onLogoutPress() {
        this.props.navigation.navigate('Login')

    }


    showCancel = () => {
        this.setState({ show: true })
    };

    hideCancel = () => {
        this.setState({ show: false })
    };

    checkincheckout = () => {

        this.setState({ visible: !this.state.visible })

        var datas = {
            "args": [[parseInt(global.uid)], "hr_attendance.hr_attendance_action_my_attendances"],
            "kwargs": {},
            "method": "attendance_manual",
            "model": "hr.employee"
        }
        return api.callRPCmethod(datas).then(res => {
            console.log('resssss', res)

            // if (res.success) {
            //     this.setState({ visible: !this.state.visible })
            // }
        });

    }



    render() {
        return (
            <View style={styles.container}>

                <ImageBackground
                    style={styles.rect}
                    imageStyle={styles.rect_imageStyle}
                    source={require("../../assets/Gradient_LZGIVfZ.png")}
                >

                    <View style={{ alignItems: 'flex-end', flexDirection: 'column', marginRight: 10 }}>
                        <TouchableOpacity onPress={() => this.onLogoutPress()}>

                            <Image
                                resizeMode="contain"
                                source={require('../../assets/logout.png')}
                                style={styles.imagelogout}
                            />
                            <Text style={{ alignItems: 'center', color: 'white' }}>Logout</Text>

                        </TouchableOpacity>
                    </View>


                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/icon.png')}
                            style={styles.imagelogo}
                        />

                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>

                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}
                        >

                            <TouchableOpacity onPress={() => this.onCRMPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="cover"
                                        source={require('../../assets/crm.png')}
                                        style={styles.image}
                                    >

                                    </Image>
                                </View>
                            </TouchableOpacity>


                            <View style={styles.rect8}>
                                <Text style={styles.text22}>CRM</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>CRM</Text> */}

                        </View>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onSalesPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/sales.png')}
                                        style={styles.image}
                                    />
                                </View>

                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Sales</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>Sales</Text> */}

                        </View>
                    </View>


                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onHRModulePress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/hrmodule.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>HR Module</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>HR Module</Text> */}

                        </View>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onInventoryPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/inventory.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Inventory</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>Inventory</Text> */}

                        </View>


                    </View>


                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onPurchasePress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/purchase.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Purchase</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>Purchase</Text> */}

                        </View>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onVendorInvoicePress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/invoicing.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Vendor Invoice</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>Vendor Invoice</Text> */}

                        </View>


                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>





                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onCheckinCheckoutPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/shift.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Check in/out</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>Checkin/Checkout</Text> */}

                        </View>

                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => this.onSettingsPress()}>

                                <View style={styles.imageContainer}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/settings.png')}
                                        style={styles.image}
                                    />
                                </View>

                            </TouchableOpacity>

                            <View style={styles.rect8}>
                                <Text style={styles.text22}>Settings</Text>
                            </View>
                            {/* <Text style={{ color: 'white' }}>Settings</Text> */}

                        </View>

                    </View>

                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>

                    <Image
                                        
                                        source={require('../../assets/basic.png')}
                                        style={styles.plan}
                                    />
                    
                    <Text style={{ color: 'white',alignItems:'center',marginTop:10,marginLeft:10, fontSize: 22, fontWeight: 'bold' }}>Basic Plan</Text>

</View>

                    {/* <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => this.onQRPress()}>

                            <View style={styles.imageContainer}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../assets/inventory.png')}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: 'white' }}>QR SCAN</Text>

                    </View> */}

                    {/* {this.state.visible == false ?
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 50 }}>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>{global.MyVar}</Text>

                            <TouchableOpacity onPress={() => this.checkincheckout()}>

                                <View style={styles.imageContainer}>
                                <Text style={{ color: 'white' }}>Welcome!</Text>

                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/loginnew.png')}
                                        style={styles.image}
                                    />
                                    <Text style={{ color: 'white' }}>Click to Check in</Text>

                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                    :
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>


                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Welcome {global.MyVar}</Text>

                            <TouchableOpacity onPress={() => this.checkincheckout()}>

                                <View style={styles.imageContainer}>
                                    <Text style={{ color: 'white' }}>Want to Check out</Text>

                                    <Image
                                        resizeMode="contain"
                                        source={require('../../assets/logoutnew.png')}
                                        style={styles.image}
                                    />

<Text style={{ color: 'white' }}>Click to Check out</Text>

                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>
                } */}
                </ImageBackground>
            </View>
        );
    }

}