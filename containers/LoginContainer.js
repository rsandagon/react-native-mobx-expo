import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Constants, Facebook } from 'expo';
import { inject,observer } from 'mobx-react';
import AppStore from '../stores/AppStore';

@inject('userStore','appStore')
@observer
export default class LoginContainer extends Component {
  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with '560009041005370' in prod
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();

          console.log('user:',profile)

          this.props.userStore.logInUser(profile)

          Alert.alert(
            'You\'ve succesfully Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.logo} source={require("../assets/images/icon.png")} />

        <TouchableHighlight style={styles.fullWidthButton} onPress={this._handleFacebookLogin}>
          <Text style={styles.fullWidthButtonText}>Continue with Facebook</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  logo:{
    paddingBottom:20,
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white'
  }
});
