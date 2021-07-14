import React, { Component } from "react";
import styles from "./style";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  Image,
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import api from '../../config/OdooConnect';
// import console = require("console");
import Toast, { DURATION } from 'react-native-easy-toast'
import LinearGradient from "react-native-linear-gradient";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: 'admin',
      password: 'AdMiN123',
      hidePassword: true

    };
  }

  state = {
    opp_Params: {},
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }



  componentDidMount() {
    console.log('loggedout');
    //  this.getKey();
  }

  async getKey() {
    try {

      if (AsyncStorage.getItem('@MySuperStore:user_name') != null) {
        const value = await AsyncStorage.getItem('@MySuperStore:user_name');

        this.props.navigation.navigate("App");
        console.log('usernameeeee', value)
      }


    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  componentWillUnmount() {
  }

  // tokenupdate(uid) {

  //   return api.getToken().then(res => {
  //     console.log("<<<<<login>>>>>", res);
  //     console.log(">>>>>>>>uid", uid)
  //     var datas = {
  //       "args": [uid, res],
  //       "kwargs": {},
  //       "method": "set_firebase_token",
  //       "model": "res.users"

  //     }
  //     return api.callRPCmethod(datas).then(res => {
  //       console.log(">>>>>>>>>success>>>>>>>>>>", res)
  //     });
  //   })
  // }

  onLoginPress() {
    const { password } = this.state;
    const { user_name } = this.state;
    if (user_name === '' && password === '') {
      Alert.alert('Please Enter valid Username and Password');
      this.refs.toast.show('Please Enter valid Username and Password', 3000);
    } else {
      return api.userLoginApi(user_name, password).then(res => {

        console.log('loginRes', res);
        if (res.success) {

          AsyncStorage.setItem('@MySuperStore:user_name', user_name);
          AsyncStorage.setItem('@MySuperStore:password', password);
          // alert('Login Successful')

          AsyncStorage.setItem('@MySuperStore:uid', res.data.uid.toString());
          // console.log('resdatauid',res.data.uid)
          // this.tokenupdate(res.data.uid);

          this.props.navigation.navigate('Dashboardpage');

        } else {
          Alert.alert('login fail');
          // this.refs.toast.show('hello!',DURATION.LENGTH_LONG);

        }
      }).catch(err => {
        console.log('err>>>>', err);
        Alert.alert('Please Enter valid Username and Password');
        // this.refs.toast.show('hello world!',DURATION.LENGTH_LONG);

      });
    }

    //  api.searchRead();
  }


  render() {
    return (

      
      <LinearGradient style={styles.container}
      colors={[
          "#FFFFFF",
          "#FFFFFF"
        ]}>



   <View style={{flex:1}}>


                {/* <Image
           
                source={require('../../assets/software.png')}
                // style={styles.imagecrm}
              /> */}

                <View style={styles.imageContainer}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/icon.png')}
                    style={styles.image}
                  />
                </View>





              <View style={{marginTop:50}}>




<Text style={{marginLeft: 10}}>Email</Text>
                  <View style={styles.SectionStyle}>


                    {/* <Image source={require('../../assets/mail.png')} style={styles.ImageStyle} /> */}

                    <TextInput
                      style={{ flex: 1,color:'black' }}
                      placeholder="Email"
                      placeholderTextColor='#000'
                      returnKeyType={'next'}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={(event) => {
                        this.refs.passwordTextInputRef.focus();
                      }}
                      onChangeText={(user_name) => this.setState({ user_name })}
                      value={this.state.user_name}
                    />

                  </View>
                  <View style={styles.textInputBottomLine} />

                  <Text style={{marginLeft: 10,marginTop:10}}>Password</Text>

                  <View style={styles.SectionStyle}>
                    {/* <Image source={require('../../assets/lock.png')} style={styles.ImageStyle} /> */}

                    <TextInput
                      ref="passwordTextInputRef"
                      style={{ flex: 1,color:'black' }}
                      placeholder="Password"
                      placeholderTextColor='#000'
                      returnKeyType="go"
                      autoCapitalize="none"
                      secureTextEntry={this.state.hidePassword}
                      autoCorrect={false}
                      onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                    />

                  </View>

                  <View style={styles.textInputBottomLine} />


                  {/* <View style={{ flexDirection: 'row',alignItems:'flex-end',justifyContent:'flex-end', marginTop: 20, marginRight:10}}>

                    <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                      <Image source={(this.state.hidePassword) ? require('../../assets/hide.png') : require('../../assets/view.png')} style={styles.btnImage} />
                    </TouchableOpacity>

                    {this.state.hidePassword == true ? <Text style={{ fontSize: 12, marginLeft: 10, color:'white' }}>Show Password</Text> : <Text style={{ fontSize: 12, marginLeft: 10, color:'white' }}>Hide Password</Text>}
                  </View> */}


                  <View style={{ alignItems: 'center' }}>

                    <TouchableOpacity style={styles.button}
                      underlayColor="transparent"
                      onPress={() => this.onLoginPress()}

                    >
                      <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                  


                  </View>
          </View>

          <View style={{flexDirection:'row',margin:10}}>
            <Text style={{flex:1,color:'black'}}>Basic Plan</Text>
            <Text style={{color:'black'}}>Powered by <Text style={{color:'green'}}>Pinnacle Seven</Text></Text>
          </View>
      </LinearGradient>
    );
  }

}