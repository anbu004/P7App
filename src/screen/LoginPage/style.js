const React = require("react-native");

const { StyleSheet } = React;

export default {

  container: {
    flex: 1,
    backgroundColor:'#0D50B8'
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 16,
    width: 16,
    alignItems: 'center'
  },
  SectionStyle: {
    flexDirection: 'row',
    
    marginLeft: 5,
    marginRight: 5
  },
  imageContainer: {
    alignItems: 'center',
    marginTop:50
  },
  image: {
    width: 200,
    height: 100,
  },
  imagecrm:{

    width:350,
    height:200
  },
  input: {
    height: 40,
    //  backgroundColor: '#1f3364',
    //  color: '#FFF',
    marginBottom: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  textInputStyle: {
    height: 40,
    marginBottom: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#D3D3D3',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingLeft: 5,
    color: 'black',
  },
  textInputBottomLine: {
    height: 1,
    backgroundColor:'black',
    marginRight:10,
    marginLeft:10
    // backgroundColor: (Platform.OS == 'ios') ? '#E6E7E9' : 'transparent',
  },
  button: {
    height: 50,
    width: 350,
    alignItems: 'center',
    // borderColor: '#6AB37B',
    // borderWidth:1,
    backgroundColor:'#0D50B8',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 15,
    // color: '#6AB37B',
    color: 'white',
    fontWeight: 'bold',
  },
  buttonSignup: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonTextSignup: {
    fontSize: 12,
  },
  viewTextRights: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textRights: {
    fontSize: 20,
    color: '#1f3364',
  },
};