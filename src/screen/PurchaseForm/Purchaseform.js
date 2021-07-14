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
    AsyncStorage,
    Image,
    Button,
    BackHandler
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

export default class PurchaseFormScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: true };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        opp_form_details: {},
        data: []
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
        console.log('read--------------calling------------api---')

        const { state } = this.props.navigation;
        this.setState.opp_Params = state.params.opprtunityFormDetail;
        console.log('idddddddd', this.setState.opp_Params.opp_id)


        this.searchReadfunction(this.setState.opp_Params.opp_id);
    }


    backPress() {
        this.props.navigation.navigate('Purchase');
    }


    orderview(id, order_line) {

        console.log('idddddddd', id);
        console.log('order_lineeeeeee', order_line);

        this.props.navigation.navigate('PurchaseOrderdetail', { 'opprtunityFormDetail': { opp_id: id, orderline: order_line } });


    }



    searchReadfunction(id) {
        console.log('read--------------calling------------api---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ['partner_ref', 'name', 'partner_id', 'date_order', 'currency_id', 'amount_untaxed', 'amount_tax', 'amount_total', 'order_line'],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('purchase.order', params)
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


    from_date(from_date) {
        var to_Date = moment(from_date).format();
        var to_Data_con = new Date(new Date(to_Date));
        to_Data_con.setHours(to_Data_con.getHours() + 5);
        to_Data_con.setMinutes(to_Data_con.getMinutes() + 30);
        var con_date = moment(to_Data_con).format('D-MM-YYYY, h:mm:ss a')
        return con_date;
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
                    centerComponent={{ text: 'Purchase', style: { color: '#fff', fontSize: 20 } }}
                    // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                    navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                    containerStyle={{
                        backgroundColor: '#0D50B8',

                    }} />

                <FlatList
                    data={this.state.data}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) => (

                        <Card style={{ borderRadius: 20 }}>

                            <View>

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Reference </Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.name} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Vendor: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.partner_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Vendor Reference: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.partner_ref} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>


                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Currency: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.currency_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Order date: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{this.from_date(item.date_order)} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Untaxed Amount: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.amount_untaxed} <FontAwesomeIcon name="rupee-sign" size={8} /></Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Taxes: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.amount_tax} <FontAwesomeIcon name="rupee-sign" size={8} /></Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Total: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.amount_total} <FontAwesomeIcon name="rupee-sign" size={8} /></Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={[{ width: 200, marginLeft: 50, marginTop: 10, alignItems: 'center', justifyContent: 'center' }]}>
                                    <Button
                                        onPress={() => this.orderview(item.id, item.order_line)}
                                        title="VIEW FOR ORDER DETAILS"
                                        color="#0D50B8"
                                    />
                                </View>

                            </View>

                        </Card>
                    )}
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