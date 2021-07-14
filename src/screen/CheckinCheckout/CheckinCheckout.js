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
    BackHandler,
} from 'react-native';
import { Card, SearchBar, Header } from 'react-native-elements';
import api from '../../config/OdooConnect';
// import console = require("console");
import Toast, { DURATION } from 'react-native-easy-toast'
import { TouchableHighlight } from "react-native-gesture-handler";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CheckinCheckoutScreen extends Component {
    constructor(props) {
        super(props)
        
        global.MyVar;
        global.uid;
        global.id;
        this.state = {
            //defauilt value of the time
            time: '',
          };
          this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    state = {
        data: [],
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
        console.log('loggedout');
        this.getKey();
        
        
    }

    async getKey() {
        try {

            if (AsyncStorage.getItem('@MySuperStore:uid') != null) {
                const valueuid = await AsyncStorage.getItem('@MySuperStore:uid');
                console.log('savedddddvale', valueuid);


                global.uid = valueuid;

                this.checkinoutstatus(global.uid);
                console.log('global.uid', global.uid)
            }


        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    checkinoutstatus(id) {
        const params = {
            domain: [["user_id", "=", parseInt(id)]],
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
                        global.id = this.state.data[0].id;
                    } else {
                        console.log('checked_out', this.state.data[0].attendance_state)
                        this.setState({ visible: false })
                        global.id = this.state.data[0].id;
                    }

                }
            },
            )
            .catch(err => console.log(err))
    }


    showCancel = () => {
        this.setState({ show: true })
    };

    hideCancel = () => {
        this.setState({ show: false })
    };

    checkincheckout(){


        var that = this;

    //Getting the current date-time with required format and UTC   
    var date = moment()
      .utcOffset('+05:30')
      .format(' hh:mm:ss a');

    that.setState({ time: date });
    
        this.setState({ visible: !this.state.visible })

        console.log('global.uid', global.id)

        var datas = {
            "args": [[parseInt(global.id)], "hr_attendance.hr_attendance_action_my_attendances"],
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

    backPress(){
        this.props.navigation.navigate('Dashboardpage');
    }


    render() {
        return (
            <View style={styles.container}>

<Header leftComponent={<FontAwesomeIcon name="home" color='#fff' size={22}
                            onPress={() => this.backPress()} />}
                            centerComponent={{ text: 'Checkin / Checkout', style: { color: '#fff', fontSize: 20 } }}
                            // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                            navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                            containerStyle={{
                                backgroundColor: '#0D50B8',

                            }} 
                        />

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

                {this.state.visible == false ?
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
                }

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color:'white' }}>{this.state.time}</Text>
      </View>

      </ImageBackground>
            </View>
        );
    }

}