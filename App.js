import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './components/Login';
import { Register} from './components/Register';
import { Router,Scene,} from 'react-native-router-flux';
import Parse from 'parse';
// import {createStackNavigator} from 'react-navigation';


export default class App extends React.Component {
constructor(props) {
    super(props);
    
  }

  render() {


    return (
  <Router>
    <Scene>
      <Scene key="login" component={Login} title="Login" hideNavBar={true} direction="leftToRight"/>
      <Scene key="register" component={Register} title="Register" hideNavBar={true} direction="leftToRight"/>
    </Scene>
  </Router>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
