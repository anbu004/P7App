const React = require("react-native");

const { StyleSheet } = React;

export default {

  container: {
    flex: 1,
    backgroundColor:'#E0E0E0'
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 16,
    width: 16,
    alignItems: 'center'
  },
  TextStyle: {
    fontSize: 15,
    fontWeight:'bold',
    color: '#000',
    textAlign: 'left'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 30,
  },
  imagelogo: {
    width: 200,
    height: 80,
    marginTop: 30,
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
    backgroundColor: (Platform.OS == 'ios') ? '#E6E7E9' : 'transparent',
  },
  button: {
    height: 40,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#65a4ae',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 15,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
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
  RectangleShapeView: {
 
    width: 40 * 2,
    height: 20,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    borderWidth: 1,
    borderColor: 'green'
   
    }
};