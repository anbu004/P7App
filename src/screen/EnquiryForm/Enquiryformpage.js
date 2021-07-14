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

export default class EnquiryFormScreen extends Component {
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
        this.props.navigation.navigate('Enquiry');
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
        this.props.navigation.navigate('Enquiry');
    }






    onLoginPress() {

        Alert.alert('welcome')


    }

    searchReadfunction(id) {
        console.log('read--------------calling------------api---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ["seq_number", "is_order", "is_cancel", "stage_id", "meeting_count", "drawing_count", "sale_number", "sale_amount_total", "active", "seq_number", "name", "company_currency", "planned_revenue", "probability", "is_exist_customer", "partner_id", "partner_name", "street", "street2", "city", "state_id", "zip", "country_id", "website", "contact_name", "title", "email_from", "function", "phone", "mobile", "opt_out", "date_deadline", "industry_id", "is_special_product", "mode_enquiry_id", "user_id", "team_id", "priority", "tag_ids", "date_conversion", "product_ids", "product_crm_line_t", "product_crm_line_f", "description", "create_uid", "create_date", "write_uid", "write_date", "history", "reopen_history", "next_action_ids", "message_follower_ids", "activity_ids", "message_ids", "display_name", "date_deadline", "lead_type"],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('crm.lead', params)
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
                    centerComponent={{ text: 'Leads', style: { color: '#fff', fontSize: 20 } }}
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

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Lead </Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.display_name.toUpperCase()} </Text>

                                </View>

                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Customer </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.partner_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Company Name </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.partner_name} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>


                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Address </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.street} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Sales Person </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.user_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Sales Team </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.team_id[1]} </Text>

                                </View>

                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Contact Name</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.contact_name} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Email </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.email_from} </Text>
                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Phone </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.phone} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Mobile </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.mobile} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Lead Type </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.lead_type} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>City </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10, textTransform: 'capitalize' }}>{item.city} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>State </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10, textTransform: 'capitalize' }}>{item.state_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Pin Code </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>{item.zip} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', flex: 3, textAlign: 'left' }}>Country </Text>
                                    <Text style={{ fontSize: 14, flex: 5, textAlign: 'left', fontWeight: 'bold', marginTop: 10, textTransform: 'capitalize' }}>{item.country_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />



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