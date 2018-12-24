import React from 'react';
import { StyleSheet, Text,ScrollView, View,ImageBackground,ActivityIndicator,Modal,TextInput,Image,Alert,TouchableOpacity,ToastAndroid } from 'react-native';

import { LoginManager } from "react-native-fbsdk";
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton ,statusCodes } from 'react-native-google-signin';


import {Actions} from 'react-native-router-flux';

export  class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
      password:"",
      username:"",
      passshow:true,
      showRegister:false,
      userData:{},
      loading: false,
     };
     Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("MSBoUqsMw6B0iSjMHCgnNKV7wxL6bmgMoSIIDfZG", "F4BdTfUK2aPccCODBrirobMp13zvFLjKCzM5fG7E","lPkApcHFZT6DD9Aq6h1eccXOI55Z56G8ZNW2OIJe");
  

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/plus.login'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '544423611909-97uhts8tgra3edad0n8ilpb62si33bl9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  androidClientId: '544423611909-d8ghvkudj9ffrlvbea1hp820acuvqt59.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});



  }

  _showPass(){
    // alert("hi");
    var _this=this;
    var pass=this.state.passshow?false:true;
    // alert(pass);
    this.setState({
      passshow:pass
    })
  }

_signIn = async () => {
 try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // this.setState({ userInfo });
    alert(userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      alert(error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
      alert(error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      alert(error);
    } else {
      alert(error);
      // some other error happened
    }
  }
  }

_Dologin(){
   var _this=this;
   this.setState({
    loading:true
   })
  fetch('https://rideotg-dev.back4app.io/login?username='+_this.state.username+'&password='+_this.state.password, {
    method: 'GET',
    headers: {
     'X-Parse-Application-Id':"MSBoUqsMw6B0iSjMHCgnNKV7wxL6bmgMoSIIDfZG",
     'X-Parse-REST-API-Key':"adwgOPyPPWvjxQhgE0AHWnzKhsZSUPMk6PC2ndRI",
     "X-Parse-Revocable-Session":"1", 
    'Content-Type': 'application/json',
    }
  }).then(response => response.json())
  .then(js=> {
    _this.setState({
    loading:false
    })
    if(js.error){
      // alert(js.error);
    ToastAndroid.show(js.error, ToastAndroid.LONG,ToastAndroid.CENTER);
    }else{
    _this.setState({
      userData:js
    });
    // alert(js);
    // alert("You are Register");
    ToastAndroid.show("Signup Successfully, Now Please login to you account", ToastAndroid.LONG,ToastAndroid.CENTER);

    }
    // console.log(js);
  });
 
};



 displayJsxMessage(isGreeting) {
      var _this=this;

return (
      <View style={{width:'100%'}}>
       <View style={styles.forms}>
    <TextInput
        style={styles.inputs}
         placeholderTextColor="#FFF"
        placeholder="username"
        onChangeText={(text) => this.setState({username:text})}
        value={this.state.username}
      />
      <View style={{position:"relative"}}>
      <TouchableOpacity 
      style={{position:"absolute",top:0,right:10,width:40,height:50,
      zIndex:99,alignItems:"center",justifyContent:"center"}}
       onPress={this._showPass.bind(this)}>
      <Image source={require('../assets/eye.png')}/>
      </TouchableOpacity>
      <TextInput
        placeholderTextColor="#FFF"
        style={styles.inputs}
        secureTextEntry={this.state.passshow}
        placeholder="Password"
        onChangeText={(text) => this.setState({password:text})}
        value={this.state.password}
      />
      </View>

  <TouchableOpacity style={styles.loginBtn} onPress={this._Dologin.bind(this)}>
    <Text style={{color:'#FFF',textAlign:'center',fontSize:19}}>Sign In</Text>
    </TouchableOpacity>
      </View>
  
  <View style={{flexDirection:"row",alignItem:"center",justifyContent:"center",width:'100%'}}>
  <LoginButton style={{width:20,height:10,padding:23,paddingRight:15,marginTop:3,paddingBottom:20,marginRight:10}}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
  <GoogleSigninButton
    style={{ width: 48, height: 48 }}
    size={GoogleSigninButton.Size.Icon}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
    disabled={this.state.isSigninInProgress} />
  </View>
  <View style={{flexDirection:"row"}}>
     
  </View>

<View style={{flexDirection:"row",alignItem:"center",justifyContent:"center",width:"100%"}} style={{marginTop:20}}>
<Text style={{color:'#FFF',textDecorationLine: "underline",textAlign:"center",textDecorationStyle: "solid",textDecorationColor: "#FFF"}}>Forgot Password?</Text>
</View>

<View style={{marginTop:20,alignItems:"center"}}>
<Text style={{color:'#FFF'}}>If you don't have an account yet</Text>
<TouchableOpacity onPress={Actions.register}>
<Text style={{color:'#FFF',textDecorationLine: "underline",textDecorationStyle: "solid",textDecorationColor: "#FFF"}}>Join Now?</Text>
</TouchableOpacity>
</View>
</View>
)

      }


  render() {
   let displayJsxMessage =this.displayJsxMessage.bind(this);
   

    return (
      <ImageBackground source={require('../assets/bg_login.jpg')} style={styles.loginBg}>
      <ScrollView style={{width:"100%"}}>
      <View style={{alignItems:"center",justifyContent:"center"}}>
     <Image style={styles.logo} source={require('../assets/app_icon.png')}/>   
    </View>
      <Modal visible={this.state.loading}    onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}>
      <View style={{flexDirection: 'row',flex: 1,justifyContent: 'center',justifyContent:"center",alignItems:"center"}}>
              <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </Modal>
    {displayJsxMessage()}
  </ScrollView>
  </ImageBackground>

  
    );
  }
}



const styles = StyleSheet.create({
  loginBg: {
    flex: 1,
    alignItems: 'center',
     width:'100%',
     height:'100%'
  },
  logo:{
    width:120,
    height:120,
    marginTop:50,
    marginBottom:20,
  },
  inputs:{
    width:'100%',
    height:50,
    color:'#FFF',
    borderWidth:1,
    borderColor:'#FFF',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:10

  },
forms:{
  width:'100%',
  padding:10,
  },

  loginBtn:{
    width:'100%',
    padding:15,
    backgroundColor:'#01c853',
    color:'#FFF',
    alignContent:'center',
    justifyContent:"center",
  }

});