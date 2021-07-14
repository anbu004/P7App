import Odoo from 'react-native-odoo-promise-based';
// import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

var endpoint = '/web/dataset/call_kw';
const userLoginApi = (user_name, password) => {
    global.odoo = new Odoo({
       

        // stagging
        // host: 'rajaserver01.go.dyndns.org',                     
        // database: 'cpr_stage_25_02_2020',
        // port: 8068 /* Defaults to 443 if https is specified */,
        // protocol: 'http' /* Defaults to http if not specified */,

        //stagging
        host: 'test-suite.pinnacleseven.com',                     
        database: 'p7test',
        port: 443 /* Defaults to 443 if https is specified */,
        protocol: 'https' /* Defaults to http if not specified */,
       

        username: user_name /* Optional if using a stored session_id */,
        password: password /* Optional if using a stored session_id */,
        // sid: 'YOUR_SESSION_ID', /* Optional if using username/password */
    });
    return odoo.connect().then(res => res).catch(err => console.log('err', err));
}

// const getToken = async () => {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     //alert("hhhh");
//     console.log("fcmToken>>>", fcmToken);
//     if (!fcmToken) {
//         fcmToken = await firebase.messaging().getToken();
//         console.log("<<<<fcmToken>>>", fcmToken);
//         if (fcmToken) {
//             await AsyncStorage.setItem('fcmToken', fcmToken);
//         }
//         console.log("<<<<lllll>>>", fcmToken);
//         return fcmToken;
//     }
//     return fcmToken;
// };

const searchRead = (model, params) => {

    return global.odoo.search_read(model, params).then(response => response)
        .catch(e => e)
}

const callRPCmethod = (params) => {
    return global.odoo.rpc_call(endpoint, params).then(response => response)
        .catch(e => e)
}
const get_read = (model, params) => {
    return global.odoo.get(model, params).then(response => response)
        .catch(e => e)
}
const creatData = (model, params) => {
    return global.odoo.create(model, params).then(response => response)
        .catch(e => e)
};
const searchRead_locat=(params)=>{
    return global.odoo.search_read("test.drive.history", params).then(response => {
        var datas = {
            "args": [id],
            "kwargs": {},
            "method": "set_mobile_location",
            "model": "test.drive.history"
      
          }
          return global.odoo.rpc_call(endpoint, params).then(response => response)
        .catch(e => e)



        return response;
    })
    .catch(e => e)
}
export default {
    userLoginApi,
    searchRead,
    callRPCmethod,
    get_read,
    creatData,
  //  getToken,
    searchRead_locat,
}