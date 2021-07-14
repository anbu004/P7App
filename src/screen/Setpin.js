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
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card, Rating, Header, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default class Setpin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myKey: null,
            errorMessage: undefined
        };
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
            const { myKey } = this.state;
            const { myKeyPhone } = this.state;

            var TextLength = myKey.length.toString();
            var TextLengthPhone = myKeyPhone.length.toString();

            if (TextLength >= 4 && TextLengthPhone >= 10) {
                await AsyncStorage.setItem('@MySuperStore:key', myKey);
                await AsyncStorage.setItem('@MySuperStore:myKeyPhone', myKeyPhone);

                this.props.navigation.navigate('Login')
            }
            //else if (TextLengthPhone >= 10) {
            //     await AsyncStorage.setItem('@MySuperStore:key', myKeyPhone);
            //     this.props.navigation.navigate('Login')
            // } 
            else {
                Alert.alert("You enter atleast 4 character for Pin and 10 character for  Mobile No")
            }

        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    componentDidMount() {
        this.getKey();
        FingerprintScanner
        .authenticate({ onAttempt: this.handleAuthenticationAttempted })
        .then(() => {
          console.log('successfully authenticated')
          // this.props.handlePopupDismissed();
        //   Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        })
        .catch((error) => {
          console.log('successfully failed')
        });
    }

    componentWillUnmount() {
        console.log('successfully matched')
        FingerprintScanner.release();
      }

      handleAuthenticationAttempted = (error) => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
      };
      
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
                    placeholder="Create a pin"
                    onChangeText={myKey => this.setState({ myKey })}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 10 }}
                    placeholder="Enter Phone No"
                    onChangeText={myKeyPhone => this.setState({ myKeyPhone })}
                />

                <View style={[{ width: 300, marginLeft: 30, marginRight: 30, marginTop: 10 }]}>
                    <Button style={styles.buttonstyle}
                        onPress={() => this.saveKey()}
                        title="Set pin"
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