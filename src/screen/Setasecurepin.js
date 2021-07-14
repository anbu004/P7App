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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default class SetasecureSetpin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myKey: null,
            errorMessage: undefined
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
        this.props.navigation.navigate('Settings');
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
            const { myKey } = this.state;
            const { myKeyPhone } = this.state;

            var TextLength = myKey.length.toString();
            var TextLengthPhone = myKeyPhone.length.toString();

            if (TextLength >= 4 && TextLengthPhone >= 10) {
                await AsyncStorage.setItem('@MySuperStore:key', myKey);
                await AsyncStorage.setItem('@MySuperStore:myKeyPhone', myKeyPhone);

                this.props.navigation.navigate('Dashboardpage')
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
      
    backPress() {
        this.props.navigation.navigate('Settings');
    }

    render() {

        return (

            <View style={styles.MainContainer}>

<Header leftComponent={<FontAwesomeIcon name="long-arrow-alt-left" color='#fff' size={22}
                            onPress={() => this.backPress()} />}
                            centerComponent={{ text: 'Set Pin', style: { color: '#fff', fontSize: 20 } }}
                            // rightComponent={<FontAwesomeIcon name="sign-out-alt" color= '#fff' size={22}  onPress={() => this.props.navigation.navigate("Notification")} /> } 
                            navigation={this.props.navigation} pageRefresh={this.pageRefresh}
                            containerStyle={{
                                backgroundColor: '#0D50B8',

                            }} />

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
        flexDirection: 'column',
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 5,
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
    },tabIcon: {
        width: 16,
        height: 16,
      },

});