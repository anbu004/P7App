import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native'

export default class Splash extends Component {

    static navigationOptions = {
        headerShown: false,
    };

    componentDidMount() {
        setTimeout(() => {

            this.getKey();

        }, 3000);
    }

    async getKey() {
        try {
            const oldpin = await AsyncStorage.getItem('@MySuperStore:key');
            console.log('savedddddvale', oldpin);

            if (oldpin != null) {
                console.log('not null old pin');
                this.props.navigation.navigate('Checkpin')

            } else {
                console.log('null old pin');
                this.props.navigation.navigate('Setpin')
            }

        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        setTimeout(() => {
            //navigate('Login')
        }, 3000);

        return (<View style={style.container}>
            <View style={style.logoContainer}>
                <Image
                resizeMode="contain"
                    style={style.logo}
                    source={require('.././assets/icon.png')}
                />

            </View>
        </View>);
    }

}
const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1f3364'
        backgroundColor: '#fff'

    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        width: 300,
        height: 150
    },
    title: {
        color: '#1f3364',
        marginTop: 10,
        fontSize: 18,

    }

}
)