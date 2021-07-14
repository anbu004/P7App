import React, { Component } from 'react';
import { AppRegistry, View, BackHandler, Alert, Platform, Text } from 'react-native';

import { Router, Stack, Scene, ActionConst, Actions } from 'react-native-router-flux';
import pushNotification from './src/pushnotification/Notification'
import NotificationWindow from './src/pushnotification/Pushnotification'
import login from './src/screen/LoginPage/Login'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppSwitchNavigator = createStackNavigator({
  
  pushNotification: { screen: pushNotification },
  NotificationWindow: { screen: NotificationWindow },

},
{
  defaultNavigationOptions:{
      // header: null
      headerShown: false
  }
},
{
  initialRouteName: 'pushNotification',
});
  

// class App extends Component {

//   render() {

//     return (
//       <Router>
//         <Stack key="root" >
//           <Scene key="pushNotification" component={pushNotification} type={ActionConst.RESET} initial hideNavBar />
//           <Scene key="NotificationWindow" component={NotificationWindow} hideNavBar />
//         </Stack>
//       </Router>
//     );
//   }
// }
const App = createAppContainer(AppSwitchNavigator)
export default App
// AppRegistry.registerComponent('App', () => App)