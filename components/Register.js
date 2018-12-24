import React from 'react';
import { StyleSheet, Text,ScrollView, View,ImageBackground,ActivityIndicator,Modal,TextInput,Image,Alert,TouchableOpacity,ToastAndroid } from 'react-native';
// import Checkbox from 'react-native-modest-checkbox'
// var {FBLoginManager} = require('react-native-facebook-login');
// FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native
import { LoginManager } from "react-native-fbsdk";
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton ,statusCodes } from 'react-native-google-signin';

import { Actions} from 'react-native-router-flux';


export  class Register extends React.Component {
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
      // LoginManager.setLoginBehavior('native');
     Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("MSBoUqsMw6B0iSjMHCgnNKV7wxL6bmgMoSIIDfZG", "F4BdTfUK2aPccCODBrirobMp13zvFLjKCzM5fG7E","lPkApcHFZT6DD9Aq6h1eccXOI55Z56G8ZNW2OIJe");
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


  _DoSignup(){
   var _this=this;

   const {username,password,email}=this.state;
   if(!username && !password && !email){

  Alert.alert(
  'Invalid Input Data',
  'Please fill all the input fields',
  );
    return ;
   }
   this.setState({
    loading:true
   });
  fetch('https://rideotg-dev.back4app.io/users', {
    method: 'POST',
    headers: {
     'X-Parse-Application-Id':"MSBoUqsMw6B0iSjMHCgnNKV7wxL6bmgMoSIIDfZG",
     'X-Parse-REST-API-Key':"adwgOPyPPWvjxQhgE0AHWnzKhsZSUPMk6PC2ndRI",
     "X-Parse-Revocable-Session":"1", 
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    username: _this.state.username,
    email: _this.state.email,
    password:_this.state.password
    }),
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

  }

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
    <TextInput
        style={styles.inputs}
         placeholderTextColor="#FFF"
        placeholder="Email"
        onChangeText={(text) => this.setState({email:text})}
        value={this.state.email}
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

  <TouchableOpacity style={styles.loginBtn} onPress={this._DoSignup.bind(this)}>
    <Text style={{color:'#FFF',textAlign:'center',fontSize:19}}>Sign Up</Text>
    </TouchableOpacity>
      </View>




<View style={{marginTop:20,alignItems:"center"}}>
<Text style={{color:'#FFF'}}>Already have an account yet</Text>
<TouchableOpacity onPress={Actions.login}>
<Text style={{color:'#FFF',textDecorationLine: "underline",textDecorationStyle: "solid",textDecorationColor: "#FFF"}}>Login Now?</Text>
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