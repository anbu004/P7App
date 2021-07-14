import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import { Card } from 'react-native-elements';

export default class NotificationWindow extends Component {

    // static propTypes = {
    //     data: PropTypes.any,
    // };

    render() {
        const { state } = this.props.navigation;
        // console.log(this.props.data)
        return (
            <View style={styles.container}>
                <View >
                    <Image
                        style={styles.image}
                        source={require('../assets/logo.png')}
                    />
                </View>
                <View >
                    <Text style={styles.header}> Ramani Cars </Text>
                </View>
                <Card containerStyle={styles.summary}>
                    <Text style={{ alignSelf: 'center', }}>Daily Summary </Text>
                </Card>
                <View style={{
                    flexDirection: 'row', alignSelf: 'center', marginTop: 20,
                }} >
                    <Card containerStyle={styles.card}>
                        <Text style={{ alignSelf: 'center', marginTop: 15, }}>{state.params.data.opportunity}</Text>

                        <Text style={{ alignSelf: 'center', }}>Opportunity</Text>

                    </Card>
                    <Card containerStyle={styles.card1}>
                        <Text style={{ alignSelf: 'center', marginTop: 15, }}>{state.params.data.retail}</Text>

                        <Text style={{ alignSelf: 'center', }}>Retail</Text>

                    </Card>
                </View>
                <View style={{
                    flexDirection: 'row', alignSelf: 'center',
                }} >
                    <Card containerStyle={styles.card2}>
                        <Text style={{ alignSelf: 'center', marginTop: 15, }}>{state.params.data.scheduled}</Text>

                        <Text style={{ alignSelf: 'center', }}>Scheduled</Text>

                    </Card>
                    <Card containerStyle={styles.card3}>
                        <Text style={{ alignSelf: 'center', marginTop: 15, }}>{state.params.data.done}</Text>

                        <Text style={{ alignSelf: 'center', }}>Done </Text>

                    </Card>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#003399",
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
    },
    image: {
        marginTop: 50,
        borderColor: '#000',
        height: 50,
        alignSelf: 'center',
        width: 50,

    },
    header: {
        alignSelf: 'center',
        color: 'white',
        // fontWeight: 'bold',
        fontSize: 15,
        marginTop: 3,
        padding: 5
    },
    summary: {
        color: 'black',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        // paddingLeft: 75,
        padding: 10,
        width: 250,
        // fontWeight: 'bold',
        fontSize: 15,
    },
    card: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#edb464',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        width: 100,
        height: 100,
        fontSize: 15,
        flexDirection: 'column',
    },
    card1: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#5dd2d7',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        width: 100,
        height: 100,
        fontSize: 15,
        flexDirection: 'column',
    },
    card2: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#f28d8d',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        width: 100,
        height: 100,
        fontSize: 15,
        flexDirection: 'column',
    },
    card3: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#91c555',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        width: 100,
        height: 100,
        fontSize: 15,
        flexDirection: 'column',
    },

});