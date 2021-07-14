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

export default class SalesOrderdetailScreen extends Component {
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
        this.props.navigation.navigate('Sales');
        return true;
    }

    componentDidMount() {
        console.log('read--------------calling------------quotationapi---')

        const { state } = this.props.navigation;
        this.setState.opp_Params = state.params.opprtunityFormDetail;
        console.log('quotationidddddddd', this.setState.opp_Params.opp_id)
        console.log('quotationorderline', this.setState.opp_Params.orderline)


        this.searchReadfunction(this.setState.opp_Params.orderline);
        // this.searchTaxReadfunction(this.setState.opp_Params.opp_id);
    }


    backPress() {
        this.props.navigation.navigate('Sales');
    }


    onLoginPress() {

        Alert.alert('welcome')


    }

    searchReadfunction(orderline) {
        console.log('read--------------calling------------apiorderline---' + orderline)


        const params = {
            domain: [["id", "=", orderline]],
            fields: ["name", "reference_po", "reference_date", "si_no", "qty_delivered", "qty_invoiced", "product_uom", "price_unit", "purchase_price", "tax_id", "weight", "product_id", "product_uom_qty", "price_subtotal", "amount_untaxed", "amount_total", "amount_tax"],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('sale.order.line', params)
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

    searchTaxReadfunction(id) {
        console.log('read--------------calling------------apiiddddddddd---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ["weight", "amount_untaxed", "amount_tax", "amount_total", "margin", "total_weight"],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('sale.order', params)
            .then(response => {
                console.log(response)
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        taxdata: response.data,
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
                                        <Text style={{ fontSize: 14, flex: 1, textAlign: 'left' }}> {item.product_uom_qty} {item.product_uom[1]} </Text>

                                    </View>

                                    {/* <View style={{
            flex: 2,
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems:'center'
        }}>

            <Text style={{ fontSize: 14, flex: 1, fontWeight: 'bold', margin: 3,  textAlign: 'left' }}> Unit of Measure  </Text>
            <Text style={{ fontSize: 14, flex: 1, textAlign: 'left' }}> {item.product_uom[1]} </Text>

        </View> */}

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
                                        backgroundColor: 'white',
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

                {/* <ScrollView horizontal={true}>

                    <View
                        style={{
                            flex: 2,
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            padding: 16,
                        }}>


                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#65a4ae',
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

                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Description</Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRightWidth: 1

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>PO No</Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRightWidth: 1

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>PO Date</Text>
                            </View>

                            <View
                                style={{
                                    width: 100,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRightWidth: 1

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>SI No</Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRightWidth: 1

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Ordered Qty</Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRightWidth: 1

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Weight</Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRightWidth: 1

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Delivered</Text>
                            </View>
                            <View
                                style={{
                                    width: 100,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 4,

                                }}>
                                <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>Invoiced</Text>
                            </View>
                        </View>


                        <FlatList
                            data={this.state.data}
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

                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.name}</Text>
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
                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.reference_po}</Text>
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
                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.reference_date}</Text>
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
                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.si_no}</Text>
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
                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.weight}</Text>
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
                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.qty_delivered}</Text>
                                    </View>

                                    <View
                                        style={{
                                            width: 100,
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                            padding: 4,
                                            flexWrap: 'wrap'
                                        }}>
                                        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>{item.qty_invoiced}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                </ScrollView> */}

                {/* <FlatList
                    data={this.state.taxdata}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                backgroundColor: 'white',
                            }}>



                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                }}>

                                <Text style={{ fontSize: 16, flex: 1, margin: 3, textAlign: 'center' }}>  Untaxed Amount: </Text>
                                <Text style={{ fontSize: 14, margin: 3, flex: 1, textAlign: 'center' }}> INR {item.amount_untaxed} </Text>

                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                }}>

                                <Text style={{ fontSize: 16, flex: 1, margin: 3, textAlign: 'center' }}>  Taxes: </Text>
                                <Text style={{ fontSize: 14, margin: 3, flex: 1, textAlign: 'center' }}>  INR {item.amount_tax} </Text>

                            </View>

                            <View
                                style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0.5,
                                    margin: 3
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                }}>

                                <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, margin: 3, textAlign: 'center' }}>  Total Amount: </Text>
                                <Text style={{ fontSize: 14, margin: 3, flex: 1, textAlign: 'center' }}>  INR {item.amount_total} </Text>

                            </View>
                            <View
                                style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0.5,
                                    margin: 3
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                }}>

                                <Text style={{ fontSize: 16, flex: 1, margin: 3, textAlign: 'center' }}>  Margin: </Text>
                                <Text style={{ fontSize: 14, margin: 3, flex: 1, textAlign: 'center' }}> INR {item.margin} </Text>

                            </View>


                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                }}>

                                <Text style={{ fontSize: 16, flex: 1, margin: 3, textAlign: 'center' }}>  Weight: </Text>
                                <Text style={{ fontSize: 14, margin: 3, flex: 1, textAlign: 'center' }}>  {item.total_weight} </Text>

                            </View>

                        </View>

                    )}
                /> */}
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