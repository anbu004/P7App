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


export default class Checkpin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newKey: null,
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

            const { newKey } = this.state;

            const oldvalue = await AsyncStorage.getItem('@MySuperStore:key');
            const value = await AsyncStorage.getItem('@MySuperStore:user_name');

            console.log('oldvalueeeee', oldvalue);

            console.log('newvalueeeee', newKey);
            // if (value != null) {
            //     this.props.navigation.navigate("App");
            // }
            if (oldvalue === newKey) {
                this.props.navigation.navigate('Login')
                // this.props.navigation.navigate('AutoComp');
                console.log(value)
            } else {
                Alert.alert('Pin not matched')
            }

        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    componentDidMount() {
        FingerprintScanner
          .authenticate({ onAttempt: this.handleAuthenticationAttempted })
          .then(() => {
            console.log('successfully authenticated')
            // this.props.handlePopupDismissed();
            // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
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
                    placeholder="Enter a pin"
                    onChangeText={newKey => this.setState({ newKey })}
                />

                <View style={[{ width: 300, marginLeft: 30, marginRight: 30, marginTop: 10 }]}>
                    <Button style={styles.buttonstyle}
                        onPress={() => this.saveKey()}
                        title="Check pin"
                        color="#0D50B8"
                    />
                </View>
                <View style={[{ marginTop: 10, alignSelf: 'center' }]}>
                    {/* <Button style={styles.buttonstyle}
                        onPress={() => this.props.navigation.navigate("ForgetPin")}
                        title="Forget Pin"
                        color="#65a4ae"
                    /> */}

                         <Text style={{fontSize:18, color:'red'}} onPress={() => this.props.navigation.navigate("ForgetPin")}>Forget Pin</Text>

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

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//       fontSize: 20,
//       textAlign: 'center',
//       margin: 10,
//     },
//     instructions: {
//       textAlign: 'center',
//       color: '#333333',
//       marginBottom: 5,
//     },
//     tabIcon: {
//       width: 16,
//       height: 16,
//     },
//   });
  

//   const Checkpin = ()  => {

//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native Navigation Sample!
//         </Text>
//       </View>
//     );
//   }
  
//   Checkpin.navigationOptions = {
//     drawer: {
//         icon: () => (
//           <Image
//             source={require('.././assets/logo.png')}
//             style={[styles.tabIcon, {tintColor: 'black'}]}
//           />
//     )}
//   };

//   export default Checkpin