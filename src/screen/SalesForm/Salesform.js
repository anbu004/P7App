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

export default class SalesFormScreen extends Component {
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
        this.props.navigation.navigate('Sales');
        return true;
    }

    componentDidMount() {
        console.log('read--------------calling------------quotationapi---')

        const { state } = this.props.navigation;
        this.setState.opp_Params = state.params.opprtunityFormDetail;
        console.log('quotationidddddddd', this.setState.opp_Params.opp_id)


        this.searchReadfunction(this.setState.opp_Params.opp_id);
    }


    backPress() {
        this.props.navigation.navigate('Sales');
    }


    orderview(id, order_line) {

        console.log('idddddddd', id);
        console.log('order_lineeeeeee', order_line);

        this.props.navigation.navigate('SalesOrderdetails', { 'opprtunityFormDetail': { opp_id: id, orderline: order_line } });


    }

    from_date(from_date) {
        var to_Date = moment(from_date).format();
        var to_Data_con = new Date(new Date(to_Date));
        to_Data_con.setHours(to_Data_con.getHours() + 5);
        to_Data_con.setMinutes(to_Data_con.getMinutes() + 30);
        var con_date = moment(to_Data_con).format('D-MM-YYYY')
        return con_date;
    }

    searchReadfunction(id) {
        console.log('read--------------calling------------api---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ["amount_tax", "amount_untaxed", "amount_total", "display_name", "partner_id", "validity_date", "pricelist_id", "payment_term_id", "state", "order_line"],
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
                    centerComponent={{ text: 'Sales', style: { color: '#fff', fontSize: 20 } }}
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

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Quotation number </Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.display_name} </Text>

                                </View>

                                <View style={styles.textInputBottomLine} />

                                {/* <View style={{ flexDirection: 'row', margin: 8 }}>

                                <Text style={{ fontSize: 14,flex:3, color: 'gray', textAlign: 'left' }}>  Email </Text>
                                <View style={{ flexDirection: 'row', flex:5, alignItems: 'center' }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left' }}>  {item.email} </Text>
                                    <FontAwesomeIcon name="envelope" size={10} />

                                </View>
                            </View> */}


                                {/* <View style={{ flexDirection: 'row', margin: 8 }}>

                                <Text style={{ fontSize: 14,flex:3, color: 'gray', textAlign: 'left' }}>  Phone </Text>

                                <View style={{ flexDirection: 'row',flex:5, alignItems: 'center' }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left' }}>  {item.phone} </Text>
                                    <FontAwesomeIcon name="phone" size={10} />


                                </View>

                            </View> */}


                                {/* <View style={{ flexDirection: 'row', margin: 8 }}>


                                <Text style={{ fontSize: 14, color: 'gray',flex:3, textAlign: 'left' }}>  Mobile </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', flex:5 }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left' }}>  {item.mobile} </Text>
                                    <FontAwesomeIcon name="mobile-alt" size={10} />

                                </View>
                            </View> */}



                                <View style={{ flexDirection: 'column' }}>


                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'gray' }}>Customer </Text>


                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.partner_id[1].toUpperCase()} </Text>


                                </View>

                                <View style={styles.textInputBottomLine} />



                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'gray' }}>Validity </Text>


                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{this.from_date(item.validity_date)} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Pricelist </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.pricelist_id[1]} </Text>

                                </View>

                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>


                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Payment Terms </Text>


                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.payment_term_id[1]} </Text>

                                </View>

                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'gray' }}>Untaxed Amount </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                                        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{item.amount_untaxed} </Text>
                                        <FontAwesomeIcon name="rupee-sign" size={10} />

                                    </View>
                                </View>

                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'gray' }}>Taxes </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                                        <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold' }}>{item.amount_tax} </Text>
                                        <FontAwesomeIcon name="rupee-sign" size={10} />

                                    </View>
                                </View>

                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>


                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'gray' }}>Total Amount </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                                        <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold' }}>{item.amount_total} </Text>
                                        <FontAwesomeIcon name="rupee-sign" size={10} />

                                    </View>
                                </View>

                                <View style={styles.textInputBottomLine} />

                                {/* <View style={{ flexDirection: 'row', margin: 8 }}>
<Text style={{ fontSize: 14, textAlign: 'left', color: 'gray',flex:3 }}>  Margin </Text>



<View style={{ flexDirection: 'row', alignItems: 'center', flex:5 }}>
    <Text style={{ fontSize: 14 }}> {item.margin} </Text>
    <FontAwesomeIcon name="rupee-sign" size={10} />
</View>
</View>

<View style={{ flexDirection: 'row', margin: 8 }}>

<Text style={{ fontSize: 14, textAlign: 'left', color: 'gray',flex:3 }}>  Weight </Text>
<Text style={{ fontSize: 14, textAlign: 'left',flex:5 }}> {item.total_weight} </Text>
</View> */}


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'gray' }}>Status </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', color: 'green', marginTop: 10, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.state} </Text>
                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={[{ width: 200, marginLeft: 50, marginTop: 10, alignItems: 'center', justifyContent: 'center' }]}>
                                    <Button
                                        onPress={() => this.orderview(item.id, item.order_line)}
                                        title="VIEW ORDER DETAILS"
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