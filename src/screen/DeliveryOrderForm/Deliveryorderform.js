import React, { Component } from "react";
import styles from "./style";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Modal,
    ActivityIndicator,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Platform,
    Button,
    AsyncStorage,
    Image,
    Linking,
    PermissionsAndroid,
    BackHandler,
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import { Card, SearchBar, Header } from 'react-native-elements';
import connect from '../../config/OdooConnect';
// import console = require("console");
import Toast, { DURATION } from 'react-native-easy-toast'
import { FlatList } from "react-native-gesture-handler";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class DeliveryFormScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            QR_Code_Value: '',

            Start_Scanner: false,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);


    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Delivery');
        return true;
    }

    openLink_in_browser = () => {

        Linking.openURL(this.state.QR_Code_Value);

    }

    onQR_Code_Scan_Done = (QR_Code) => {

        this.setState({ QR_Code_Value: QR_Code });

        this.setState({ Start_Scanner: false });
    }

    open_QR_Code_Scanner = () => {

        var that = this;

        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'Camera App Permission',
                        'message': 'Camera App needs access to your camera '
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                        that.setState({ QR_Code_Value: '' });
                        that.setState({ Start_Scanner: true });
                    } else {
                        alert("CAMERA permission denied");
                    }
                } catch (err) {
                    alert("Camera permission err", err);
                    console.warn(err);
                }
            }
            requestCameraPermission();
        } else {
            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
        }
    }

    state = {
        opp_form_details: {},
        data: [],
        movedata: []

    }

    componentDidMount() {
        console.log('read--------------calling------------quotationapi---')

        const { state } = this.props.navigation;
        this.setState.opp_Params = state.params.opprtunityFormDetail;
        console.log('quotationidddddddd', this.setState.opp_Params.opp_id)


        this.searchReadfunction(this.setState.opp_Params.opp_id);
    }


    backPress() {
        this.props.navigation.navigate('Delivery');
    }


    orderview(id, order_line) {

        console.log('idddddddd', id);
        console.log('order_lineeeeeee', order_line);

        // this.props.navigation.navigate('QuotationOrderdetail', { 'opprtunityFormDetail': { opp_id: id, orderline: order_line } });


    }

    searchReadfunction(id) {
        console.log('read--------------calling------------api---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ["display_name", "partner_id", "company_id", "scheduled_date", "move_ids_without_package", "id"],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('stock.picking', params)
            .then(response => {
                console.log(response)
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        data: response.data,
                    });
                    this.searchReceiptReadfunction(this.state.data[0].move_ids_without_package);

                    console.log('move_ids_without_package', this.state.data[0].move_ids_without_package)

                }
            },
            )
            .catch(err => console.log(err))
    }


    searchReceiptReadfunction(id) {
        console.log('read--------------calling------------api---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ["product_id", "product_uom", "quantity_done", "product_uom_qty"],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('stock.move', params)
            .then(response => {
                console.log(response)
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        movedata: response.data,
                    });
                    console.log('move_ids_without_package', this.state.movedata)


                }
            },
            )
            .catch(err => console.log(err))
    }

    from_date(from_date) {
        var to_Date = moment(from_date).format();
        var to_Data_con = new Date(new Date(to_Date));
        to_Data_con.setHours(to_Data_con.getHours() + 5);
        to_Data_con.setMinutes(to_Data_con.getMinutes() + 30);
        var con_date = moment(to_Data_con).format('D-MM-YYYY, h:mm:ss a')
        return con_date;
    }

    render() {
        if (!this.state.Start_Scanner) {

            return (


                <View style={styles.container}>

                    <Header leftComponent={<FontAwesomeIcon name="long-arrow-alt-left" color='#fff' size={22}
                        onPress={() => this.backPress()} />}
                        centerComponent={{ text: 'Delivery Orders', style: { color: '#fff', fontSize: 20 } }}
                        // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                        navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                        containerStyle={{
                            backgroundColor: '#0D50B8',

                        }} />

                    <View style={{ flex: 4 }}>

                        <FlatList
                            data={this.state.data}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item }) => (

                                <Card>

                                    <View>

                                        <View style={{ flexDirection: 'column' }}>

                                            <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Reference </Text>

                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.display_name} </Text>

                                        </View>

                                        <View style={styles.textInputBottomLine} />

                                        <View style={{ flexDirection: 'column' }}>

                                            <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Partner </Text>


                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.partner_id[1]} </Text>

                                        </View>

                                        <View style={styles.textInputBottomLine} />


                                        <View style={{ flexDirection: 'column' }}>

                                            <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Operation type </Text>


                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.company_id[1]} </Text>



                                        </View>

                                        <View style={styles.textInputBottomLine} />



                                        <View style={{ flexDirection: 'column' }}>


                                            <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Schedule Date </Text>


                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{this.from_date(item.scheduled_date)} </Text>

                                        </View>

                                    </View>

                                </Card>

                            )}
                        />

                    </View>


                    <View
                        style={{
                            flex: 5,
                            flexDirection: 'column',
                            backgroundColor: 'white',

                        }}>

                        <ScrollView horizontal={true}>

                            <View
                                style={{
                                    flex: 5,
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                    margin: 5
                                }}>

                                {/* <Button style={{ width: 500, marginTop: 10 }}
                                    onPress={this.open_QR_Code_Scanner}
                                    title="QR SCAN"
                                    color="#0D50B8"
                                />

                                <Text style={styles.QR_text}>
                                    {this.state.QR_Code_Value ? 'Scanned QR Code: ' + this.state.QR_Code_Value : ''}
                                </Text> */}

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#0D50B8',
                                        borderWidth: 1
                                    }}>
                                    <View
                                        style={{
                                            width: 100,
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: 4,
                                            borderRightWidth: 1,

                                        }}>

                                        <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Product</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 100,
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: 4,
                                            borderRightWidth: 1
                                        }}>

                                        <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Initital Demand</Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: 4,
                                            borderRightWidth: 1

                                        }}>
                                        <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Done</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 100,
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: 4,
                                            borderRightWidth: 1

                                        }}>
                                        <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Unit of Measure</Text>
                                    </View>


                                </View>


                                <FlatList
                                    data={this.state.movedata}
                                    keyExtractor={(x, i) => i}
                                    renderItem={({ item }) => (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: 'white',
                                                borderWidth: 1,
                                            }}>
                                            <View
                                                style={{
                                                    width: 100,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    padding: 4,
                                                    borderRightWidth: 1,
                                                    flexWrap: 'wrap'
                                                }}>
                                                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.product_id[1]}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    width: 100,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    padding: 4,
                                                    borderRightWidth: 1,
                                                    flexWrap: 'wrap'
                                                }}>

                                                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.product_uom_qty}</Text>
                                            </View>

                                            <View
                                                style={{
                                                    width: 100,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    padding: 4,
                                                    borderRightWidth: 1,
                                                    flexWrap: 'wrap'
                                                }}>
                                                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.quantity_done}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    width: 100,
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                    padding: 4,
                                                    borderRightWidth: 1,
                                                    flexWrap: 'wrap'
                                                }}>
                                                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.product_uom}</Text>
                                            </View>

                                        </View>
                                    )}
                                />
                            </View>

                        </ScrollView>


                    </View>
                </View>


            );
        }
        return (
            <View style={{ flex: 1 }}>

                <CameraKitCameraScreen
                    showFrame={true}
                    scanBarcode={true}
                    laserColor={'#FF3D00'}
                    frameColor={'#00C853'}
                    colorForScannerFrame={'black'}
                    onReadCode={event =>
                        this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
                    }
                />

            </View>
        );
    }


}

const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible}>
        <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        </View>
    </Modal>
);