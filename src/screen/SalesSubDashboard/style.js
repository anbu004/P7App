const React = require("react-native");

const { StyleSheet } = React;

export default {

  container: {
    flex: 1,
    backgroundColor: '#875A7B',
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
  rect: {
    top: 80,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  rect_imageStyle: {
    opacity: 0.69
  },rect9: {
    height: 27,
    width:120,
    backgroundColor: "rgba(21,19,19,0.5)",
    justifyContent: "center"
  },rect8: {
    height: 27,
    width:80,
    backgroundColor: "rgba(21,19,19,0.5)",
    justifyContent: "center"
  },
  text22: {
    color: "rgba(247,252,253,1)",
    fontSize: 12,
    alignSelf: "center"
  },
};