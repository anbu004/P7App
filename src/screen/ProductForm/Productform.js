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
import ImagePicker from 'react-native-image-picker'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class ProductFormScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: true };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        opp_form_details: {},
        data: [],
        photo: null,
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.navigate('Product');
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
        this.props.navigation.navigate('Product');
    }






    onLoginPress() {

        Alert.alert('welcome')


    }

    searchReadfunction(id) {
        console.log('read--------------calling------------api---' + id)


        const params = {
            domain: [["id", "=", id]],
            fields: ['image_small', 'lst_price', 'name', 'qty_available', 'product_variant_count', 'uom_id', 'uom_po_id', 'list_price', 'standard_price', 'l10n_in_hsn_code', 'categ_id', 'type', 'default_code', 'green_weight'],
            order: '',
            limit: '',
            offset: '',
        }

        return connect.searchRead('product.template', params)
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

    handleChoosePhoto = () => {
        console.log('click photo')
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }

    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            // // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.fileName };
                console.log('response-------------------------', source);
                console.log('>>>>>>>>>>id', this.setState.opp_Params.opp_id)
                this.setState({
                    data: response.data,
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                    fileName: response.fileName,
                    fileType: response.type

                });
            }
        });

    }


    render() {
        const { photo } = this.state

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
                    centerComponent={{ text: 'Product', style: { color: '#fff', fontSize: 20 } }}
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

                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        padding: 4,
                                    }}>

                                    {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View> */}

                                    <Image source={item.image_small.length
                                        ? { uri: 'data:image/png;base64,' + item.image_small }
                                        : require('../../assets/camera.png')} style={styles.imageround} onPress={this.launchImageLibrary} />

                                    <Text>Edit</Text>


                                    <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>  {item.name} </Text>

                                </View>

                                <View style={{ flexDirection: 'column' }}>


                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Product Type </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.type} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Product Category </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.categ_id[1]} </Text>

                                </View>

                                <View style={styles.textInputBottomLine} />


                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Internal Reference </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.default_code} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>HSN/SAC Code </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.l10n_in_hsn_code} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray' }}>Sales Price </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.list_price} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Cost </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.standard_price} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Unit of Measure </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.uom_id[1]} </Text>

                                </View>
                                <View style={styles.textInputBottomLine} />

                                <View style={{ flexDirection: 'column' }}>

                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'left' }}>Purchase Unit of Measure </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>{item.uom_po_id[1]} </Text>

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