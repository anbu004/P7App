import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    FlatList,
    ScrollView,
    Image,
    TextInput,
    Button,
    AsyncStorage,
    Alert,
    BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card, Rating, Header, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Checkpin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newKey: null
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
        this.props.navigation.navigate('Checkpin');
        return true;
    }

    async getKey() {
        try {
            const value = await AsyncStorage.getItem('@MySuperStore:key');
            console.log('savedddddvale', value);




        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    async saveKey() {
        try {

            const { newKeyPhone } = this.state;

            const oldvalue = await AsyncStorage.getItem('@MySuperStore:myKeyPhone');
            const value = await AsyncStorage.getItem('@MySuperStore:user_name');

            console.log('oldvalueeeee', oldvalue);

            console.log('newvalueeeee', newKeyPhone);
            // if (value != null) {
            //     this.props.navigation.navigate("App");
            // }
            if (oldvalue === newKeyPhone) {
                this.props.navigation.navigate('Setpin')
                // this.props.navigation.navigate("App");
                console.log(value)
            } else {
                Alert.alert('Pin not matched')
            }

        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    componentDidMount() {
        //     if (AsyncStorage.getItem('@MySuperStore:user_name') != null) {
        //         const value =  AsyncStorage.getItem('@MySuperStore:user_name');

        //         this.props.navigation.navigate("App");
        //         console.log('usernameeeee', value)
        //     }
        //     this.getKey();
    }

    render() {

        return (

            <View style={styles.MainContainer}>

                <View style={styles.imageContainer}>
                    <Image
                        resizeMode="contain"
                        source={require('.././assets/icon.png')}
                        style={styles.image}
                    />
                </View>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 10 }}
                    placeholder="Enter a Phone Num"
                    onChangeText={newKeyPhone => this.setState({ newKeyPhone })}
                />

                <View style={[{ width: 300, marginLeft: 30, marginRight: 30, marginTop: 10 }]}>
                    <Button style={styles.buttonstyle}
                        onPress={() => this.saveKey()}
                        title="New Pin"
                        color="#0D50B8"
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'column'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 5,
    },
    MainContainer: {

        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 120,
        marginBottom: 30,
    },

    buttonstyle: {
        marginTop: 30,
        width: 300
    }

});