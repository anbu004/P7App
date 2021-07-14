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
    Linking,
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

export default class OpportunityScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: true, search: '' };
        this.arrayholder = [];
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        data: [],
        search: '',
        scaleAnimationDialog: false
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.navigate('SubDashboard');
        return true;
    }

    componentDidMount() {
        console.log('read--------------calling------------api---')



        this.searchReadfunction();
    }

    backPress() {
        this.props.navigation.navigate('SubDashboard');
    }

    popPress() {
        console.log("asasasasasasasasasasasasasa")
        this.setState({
            scaleAnimationDialog: true,
        });
    }


    addLog(data) {

        // console.log('texttt', data)

        if (data == 'today') {
            const { state } = this.props.navigation;

            var today = new Date();
            let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();

            var todayDate = moment(Date(date)).format('YYYY-MM-DD');

            console.log(todayDate);

            this.setState({
                scaleAnimationDialog: false,
            });

            this.searchReadtoday(todayDate);

        } else if (data == 'yesterday') {

            const { state } = this.props.navigation;
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate() - 1;

            var newmonth;
            var newdate;
            if (month < 10) {
                newmonth = '0' + month;
            } else {
                newmonth = month;
            }

            if (day < 10) {
                newdate = '0' + day;
            } else {
                newdate = day;
            }

            let yesterdaydate = year + '-' + newmonth + '-' + newdate;

            console.log('yesterdatdate', yesterdaydate);
            this.setState({
                scaleAnimationDialog: false,
            });
            this.searchReadyesterday(yesterdaydate);


        } else if (data == 'This Week') {

            console.log('thissss weeek')

            var today = new Date();
            var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
            if (day !== 1)                // Only manipulate the date if it isn't Mon.
                today.setHours(-24 * (day - 1));   // Set the hours to day number minus 1

            var date = new Date(today),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            console.log([date.getFullYear(), mnth, day].join("-"))

            this.setState({
                scaleAnimationDialog: false,
            });

            this.searchReadthisweek([date.getFullYear(), mnth, day].join("-"));



        } else if (data == 'Last Week') {

            console.log('last weeek')

            //this week date
            var today = new Date();
            var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
            if (day !== 1)                // Only manipulate the date if it isn't Mon.
                today.setHours(-24 * (day - 1));   // Set the hours to day number minus 1

            var date = new Date(today),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);

            var currentweekdate = [date.getFullYear(), mnth, day].join("-");
            console.log(currentweekdate);

            //last week date
            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay() - 6; // Gets day of the month (e.g. 21) - the day of the week (e.g. wednesday = 3) = Sunday (18th) - 6
            var startDate = new Date(curr.setDate(first));


            var d = new Date(startDate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            var lastweekdate = [year, month, day].join('-');

            console.log(lastweekdate);

            this.setState({
                scaleAnimationDialog: false,
            });

            this.searchReadlastweek(currentweekdate, lastweekdate)



        } else if (data == 'This Month') {

            var dateObj = new Date();

            dateObj.setDate(0)

            var month = dateObj.getMonth() + 1;

            var day = dateObj.getDate();

            var year = dateObj.getFullYear();

            var newmonth;
            var newdate;
            if (month < 10) {
                newmonth = '0' + month;
            } else {
                newmonth = month;
            }

            if (day < 10) {
                newdate = '0' + day;
            } else {
                newdate = day;
            }


            newdate = year + "-" + newmonth + "-" + newdate;

            this.setState({
                scaleAnimationDialog: false,
            });

            this.searchReadthismonth(newdate);


        } else if (data == 'Last Month') {



            var now = new Date();
            var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
            var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);

            var formatDateComponent = function (dateComponent) {
                return (dateComponent < 10 ? '0' : '') + dateComponent;
            };

            var formatDate = function (date) {
                return formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) + '-' + date.getFullYear();
            };


            console.log('prevMonthLastDate' + formatDate(prevMonthLastDate));

            var firstdate = formatDate(prevMonthFirstDate);
            var lastdate = formatDate(prevMonthLastDate);

            var datearray = firstdate.split("-");

            var newfirstdate = datearray[2] + '-' + datearray[0] + '-' + datearray[1];

            console.log('prevMonthFirstDate' + newfirstdate);


            var datearray1 = lastdate.split("-");

            var newlastdate = datearray1[2] + '-' + datearray1[0] + '-' + datearray1[1];

            console.log('prevMonthLastDate' + newlastdate);

            this.setState({
                scaleAnimationDialog: false,
            });

            this.searchReadlastmonth(newfirstdate, newlastdate);



        }

        else {
            console.log('allllll')
            const { state } = this.props.navigation;

            this.setState({
                scaleAnimationDialog: false,
            });

            this.searchReadfunction();

        }


    }


    searchReadtoday(todayDate) {
        console.log('read--------------calling------------api---' + todayDate)

        const params = {
            domain: [["type", "=", "opportunity"], ["create_date", "=", todayDate]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }

    searchReadyesterday(yesterDate) {
        console.log('read--------------calling------------api---' + yesterDate)
        const context = {
            uid: this.props.displayStr,
            tz: false,
            lang: 'en_US',
            default_team_id: 1,
            search_default_assigned_to_me: 0,
        }

        const params = {
            domain: [["type", "=", "opportunity"], ["create_date", "=", yesterDate]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }


    searchReadthisweek(thisweekDate) {
        console.log('read--------------calling------------apiweek---' + thisweekDate)
        const context = {
            uid: this.props.displayStr,
            tz: false,
            lang: 'en_US',
            default_team_id: 1,
            search_default_assigned_to_me: 0,
        }

        const params = {
            domain: [["type", "=", "opportunity"], ["create_date", ">=", thisweekDate]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }

    searchReadlastweek(thisweekDate, lastweekDate) {
        console.log('read--------------calling------------thisweekDate---', thisweekDate)
        console.log('read--------------calling------------lastweekDate---', lastweekDate)


        const params = {
            domain: [["type", "=", "opportunity"], ["create_date", "<", thisweekDate], ["create_date", ">", lastweekDate]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }


    searchReadthismonth(thismonthDate) {
        console.log('read--------------calling------------this month date---' + thismonthDate)
        const context = {
            uid: this.props.displayStr,
            tz: false,
            lang: 'en_US',
            default_team_id: 1,
            search_default_assigned_to_me: 0,
        }

        const params = {
            domain: [["type", "=", "opportunity"], ["create_date", ">=", thismonthDate]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }

    searchReadlastmonth(lastmonthfirstDate, lastmonthendDate) {
        console.log('read--------------calling------------thisweekDate---', lastmonthfirstDate)
        console.log('read--------------calling------------lastweekDate---', lastmonthendDate)
        const context = {
            uid: this.props.displayStr,
            tz: false,
            lang: 'en_US',
            default_team_id: 1,
            search_default_assigned_to_me: 0,
        }

        const params = {
            domain: [["type", "=", "opportunity"], ["create_date", "<", lastmonthendDate], ["create_date", ">=", lastmonthfirstDate]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }

    onLoginPress() {

        Alert.alert('welcome')


    }

    searchReadfunction() {
        console.log('read--------------calling------------api---')


        const params = {
            domain: [["type", "=", "opportunity"]],
            fields: ["phone", "planned_revenue", "probability", "mobile", "stage_id", "message_needaction", "mode_enquiry_id", "is_special_product", "id", "partner_id", "probability", "create_date", "received_enquiry_date", "date_deadline", "seq_number", "name"],
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
                    },
                        function () {
                            this.arrayholder = response.data;
                        });
                }
            },
            )
            .catch(err => console.log(err))
    }


    goToOprtunityDetailScreen(id) {
        console.log('key>>', id);
        this.props.navigation.navigate('OpportunityForm', { 'opprtunityFormDetail': { opp_id: id } });
    };

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
            console.log('---------------num', number)
        }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    dialEmail = (email) => {
        let emailnot = '';
        if (Platform.OS === 'android') {
            emailnot = `mailto:${email}`;
            console.log('---------------num', email)
        }
        else { emailnot = `mailto:${email}`; }
        Linking.openURL(emailnot);
    };

    search = text => {
        console.log(text);
    };
    clear = () => {
        this.search.clear();
    };


    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            // const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const itemData = `${item.name.toUpperCase()}   
            ${item.phone} ${item.partner_id[1].toUpperCase()} ${item.stage_id[1].toUpperCase()}`;
           
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            data: newData,
            search: text,
        });
    }
    ListViewItemSeparator = () => {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#FFF',
                }}
            />
        );
    };

    render() {
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <CustomProgressBar />
                </View>
            );
        }
        try {
            if (this.state.data.length > 0) {
                return (


                    <View style={styles.container}>

                        <Header leftComponent={<FontAwesomeIcon name="long-arrow-alt-left" color='#fff' size={22}
                            onPress={() => this.backPress()} />}
                            centerComponent={{ text: 'Opportunity', style: { color: '#fff', fontSize: 20 } }}
                            // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                            navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                            containerStyle={{
                                backgroundColor: '#0D50B8',

                            }} rightComponent={<FontAwesomeIcon name="filter" color='#fff' size={22}
                                onPress={() => this.popPress()} />} />
                        <SearchBar
                            lightTheme
                            onChangeText={text => this.SearchFilterFunction(text)}
                            onClear={text => this.SearchFilterFunction('')}
                            placeholder="Search"
                            placeholderTextColor={'#000'}
                            value={this.state.search}
                            color='black'
                            containerStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                        />


                        <FlatList
                            data={this.state.data}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={() => this.goToOprtunityDetailScreen(item.id)}>
                                    <Card>

                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: 'white',

                                            }}>



                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column'
                                            }}>

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                    }} >

                                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', flexShrink: 1, flex: 1 }}>{item.name} </Text>


                                                    <View style={{
                                                        flexDirection: 'row',
                                                        backgroundColor: 'white',
                                                        alignItems: 'center'
                                                    }}>

                                                        <Text style={{ fontSize: 14, textAlign: 'left', marginTop: 5, flexShrink: 1 }} onPress={() => { this.dialCall(item.phone) }}>{item.phone} </Text>

                                                    </View>

                                                </View>
                                                {/* <Text style={{ fontSize: 14, textAlign: 'right' }}>  {item.received_enquiry_date} </Text> */}

                                            </View>

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column'
                                            }}>

                                                <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', flexShrink: 1, flex: 1 }}>{item.partner_id[1]} </Text>

                                                <Text style={{ fontSize: 14, marginTop: 5, textAlign: 'left', flexShrink: 1 }}>Probability : {item.probability} </Text>
                                                {/* <Text style={{ fontSize: 14, marginTop: 5, textAlign: 'left',flexShrink: 1 }}> {item.email_from} </Text> */}

                                            </View>


                                            <View
                                                style={{
                                                    backgroundColor: '#ffc40c',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 25,
                                                    marginLeft: 5,
                                                    padding: 10,
                                                    width: 80
                                                }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    {item.stage_id[1].toUpperCase()}
                                                </Text>
                                            </View>

                                            {/* <View style={{
                                                    flex: 2,
                                                    flexDirection: 'row',
                                                    backgroundColor: 'white',
                                                }}>
                                                <Text style={{ fontSize: 12, textAlign: 'left', flex:1 }}> Contact by </Text>

<Image source={require('../../assets/call.png')} style={{ alignItems: 'flex-end', width: 20, height: 20 }} />

<Text style={{ fontSize: 10, margin: 3, textAlign: 'left' }} onPress={() => { this.dialCall(item.mobile) }}> {item.mobile} </Text>


{/* <Image source={require('../../assets/email.jpg')} style={{ alignItems: 'flex-end', width: 20, height: 20, marginLeft: 50 }} />

<Text style={{ fontSize: 10, margin: 3, textAlign: 'left'}} onPress={() => { this.dialEmail(item.email) }}> {item.email} </Text> */}


                                        </View>
                                    </Card>
                                </TouchableOpacity>

                            )}
                        />

                        <View style={{ flex: 1 }}>
                            <Dialog
                                onDismiss={() => {
                                    this.setState({ scaleAnimationDialog: false });
                                }}
                                width={0.9}
                                visible={this.state.scaleAnimationDialog}
                                rounded
                                actionsBordered
                                dialogTitle={
                                    <DialogTitle
                                        title="Filter"
                                        style={{
                                            backgroundColor: '#F7F7F8',
                                            padding: 15,
                                            fontSize: 35,
                                        }}
                                        hasTitleBar={false}
                                        align="center"
                                    />
                                } footer={
                                    <DialogFooter>
                                        <DialogButton
                                            text="CANCEL"
                                            bordered
                                            onPress={() => {
                                                this.setState({ scaleAnimationDialog: false });
                                            }}
                                            key="button-1"
                                        />

                                    </DialogFooter>
                                }
                            >
                                <DialogContent
                                    style={{
                                        backgroundColor: '#F7F7F8',
                                    }}>
                                    <View style={styles.textAreaContainer} >
                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('yesterday')
                                        }}>
                                            Yesterday
                  </Text>
                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('today')
                                        }}>
                                            Today
                  </Text>


                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('This Week')
                                        }}>
                                            This Week
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('Last Week')
                                        }}>
                                            Last Week
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('This Month')
                                        }}>
                                            This Month
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('Last Month')
                                        }}>
                                            Last Month
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('all')
                                        }}>
                                            All
                  </Text>

                                    </View>
                                </DialogContent>
                            </Dialog>
                        </View>


                    </View>


                );
            }
            else {
                return (
                    <View style={styles.container}>
                        <Header centerComponent={{ text: 'Opportunity', style: { color: '#fff', fontSize: 20 } }}
                            leftComponent={<FontAwesomeIcon name="long-arrow-alt-left" color='#fff' size={22}
                                onPress={() => this.backPress()} />}
                            // rightComponent={<FontAwesomeIcon name="filter" color='#fff' size={22}
                            //   onPress={() => this.popPress()} />}
                            containerStyle={{
                                backgroundColor: '#0D50B8',
                                justifyContent: 'space-around',
                            }} rightComponent={<FontAwesomeIcon name="filter" color='#fff' size={22}
                                onPress={() => this.popPress()} />} />

                        <SearchBar
                            lightTheme
                            onChangeText={text => this.SearchFilterFunction(text)}
                            onClear={text => this.SearchFilterFunction('')}
                            placeholder="Search"
                            placeholderTextColor={'#000'}
                            value={this.state.search}
                            color='black'
                            containerStyle={{ backgroundColor: 'white', borderRadius: 5 }}
                        />


                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={styles.imageContainer}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../assets/growth.png')}
                                    style={styles.image}
                                />
                            </View>
                            <Text style={{ alignSelf: 'center', justifyContent: 'center', fontSize: 20, color: '#0D50B8' }}> No Opportunity</Text>

                        </View>


                        <View style={{ flex: 1 }}>
                            <Dialog
                                onDismiss={() => {
                                    this.setState({ scaleAnimationDialog: false });
                                }}
                                width={0.9}
                                visible={this.state.scaleAnimationDialog}
                                rounded
                                actionsBordered
                                dialogTitle={
                                    <DialogTitle
                                        title="Filter"
                                        style={{
                                            backgroundColor: '#F7F7F8',
                                            padding: 15,
                                            fontSize: 35,
                                        }}
                                        hasTitleBar={false}
                                        align="center"
                                    />
                                } footer={
                                    <DialogFooter>
                                        <DialogButton
                                            text="CANCEL"
                                            bordered
                                            onPress={() => {
                                                this.setState({ scaleAnimationDialog: false });
                                            }}
                                            key="button-1"
                                        />

                                    </DialogFooter>
                                }
                            >
                                <DialogContent
                                    style={{
                                        backgroundColor: '#F7F7F8',
                                    }}>
                                    <View style={styles.textAreaContainer} >
                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('yesterday')
                                        }}>
                                            Yesterday
                  </Text>
                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('today')
                                        }}>
                                            Today
                  </Text>


                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('This Week')
                                        }}>
                                            This Week
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('Last Week')
                                        }}>
                                            Last Week
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('This Month')
                                        }}>
                                            This Month
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('Last Month')
                                        }}>
                                            Last Month
                  </Text>

                                        <Text style={{ padding: 8 }} onPress={() => {
                                            this.addLog('all')
                                        }}>
                                            All
                  </Text>

                                    </View>
                                </DialogContent>
                            </Dialog>
                        </View>
                    </View>
                );
            }
        } catch{ }

    }


}

const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible}>
        <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
                <ActivityIndicator size="large" />
                <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
            </View>
        </View>
    </Modal>
);