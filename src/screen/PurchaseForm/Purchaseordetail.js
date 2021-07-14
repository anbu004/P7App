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

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class PurchaseOrderdetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        opp_form_details: {},
        data: [],
        taxdata: []

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.navigate('Purchase');
        return true;
    }


    componentDidMount() {
        console.log('read--------------calling------------quotationapi---')

        const { state } = this.props.navigation;
        this.setState.opp_Params = state.params.opprtunityFormDetail;
        console.log('quotationidddddddd', this.setState.opp_Params.opp_id)
        console.log('quotationorderline', this.setState.opp_Params.orderline)


        this.searchReadfunction(this.setState.opp_Params.orderline);
    }


    backPress() {
        this.props.navigation.navigate('Purchase');
    }


    searchReadfunction(orderline) {
        console.log('read--------------calling------------apiorderline---' + orderline)


        const params = {
            domain: [["id", "=", orderline]],
            fields: ["product_uom", "product_id", "product_qty", "qty_received", "price_unit", "price_subtotal"],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('purchase.order.line', params)
            .then(response => {
                console.log(response)
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        data: response.data,
                    });

                }
            },
            )
            .catch(err => console.log(err))
    }


    render() {

        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CustomProgressBar />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Header leftComponent={<FontAwesomeIcon name="long-arrow-alt-left" color='#fff' size={22}
                    onPress={() => this.backPress()} />}
                    centerComponent={{ text: 'Order Details', style: { color: '#fff', fontSize: 20 } }}
                    // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                    navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                    containerStyle={{
                        backgroundColor: '#0D50B8',

                    }} />

                <FlatList
                    data={this.state.data}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) => (
                        <Card>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    backgroundColor: 'white',
                                    padding: 4,
                                }}>

                                <View
                                    style={{
                                        flex: 7,
                                        flexDirection: 'column',
                                        backgroundColor: 'white',
                                    }} >

                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        alignItems: 'center'
                                    }}>

                                        <Text style={{ fontSize: 14, flex: 1, fontWeight: 'bold', margin: 3, textAlign: 'left' }}> Product </Text>

                                        <Text style={{ fontSize: 14, flex: 1, textAlign: 'left' }}> {item.product_id[1]} </Text>

                                    </View>

                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        alignItems: 'center'
                                    }}>

                                        <Text style={{ fontSize: 14, flex: 1, fontWeight: 'bold', margin: 3, textAlign: 'left' }}> Quantity  </Text>
                                        <Text style={{ fontSize: 14, flex: 1, textAlign: 'left' }}> {item.product_qty} {item.product_uom[1]} </Text>

                                    </View>

                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        alignItems: 'center'
                                    }}>

                                        <Text style={{ fontSize: 14, flex: 1, fontWeight: 'bold', margin: 3, textAlign: 'left' }}> Received Qty</Text>
                                        <Text style={{ fontSize: 14, flex: 1, textAlign: 'left' }}> {item.qty_received} </Text>

                                    </View>

                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        alignItems: 'center'
                                    }}>

                                        <Text style={{ fontSize: 14, flex: 1, fontWeight: 'bold', margin: 3, textAlign: 'left' }}> Unit Price  </Text>
                                        <Text style={{ fontSize: 14, flex: 1, textAlign: 'left' }}> {item.price_unit} </Text>

                                    </View>

                                    <View style={{
                                        flex: 2,
                                        flexDirection: 'row',
                                    }}>

                                        <Text style={{ fontSize: 14, flex: 1, fontWeight: 'bold', margin: 3, textAlign: 'left' }}> Subtotal  </Text>

                                        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                                            <Text style={{ fontSize: 14, color: 'green' }}> {item.price_subtotal} </Text>
                                            <FontAwesomeIcon name="rupee-sign" color='green' size={10} />

                                        </View>
                                    </View>

                                </View>
                            </View>
                        </Card>
                    )}
                />


            </View>
        )
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